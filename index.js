import dotenv from "dotenv";
dotenv.config();

import express from "express";
import multer from "multer";
import fs from "fs";
import speech from "@google-cloud/speech";
import textToSpeech from "@google-cloud/text-to-speech";
import TelegramBot from "node-telegram-bot-api";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import fetch from "node-fetch";
import path from "path";
import { google } from "googleapis";

ffmpeg.setFfmpegPath(ffmpegPath);

// ===== Environment Variables =====
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
process.env.GOOGLE_APPLICATION_CREDENTIALS = "./google-credentials.json";

if (!TELEGRAM_TOKEN || !GEMINI_KEY || !YOUTUBE_API_KEY) {
  console.error("❌ Missing TELEGRAM_BOT_TOKEN, GEMINI_API_KEY, or YOUTUBE_API_KEY");
  process.exit(1);
}

// ===== Express Setup =====
const app = express();
const upload = multer({ dest: "uploads/" });
const speechClient = new speech.SpeechClient();
const ttsClient = new textToSpeech.TextToSpeechClient();

app.use(express.json());

// 🎤 Speech-to-Text Endpoint
app.post("/api/stt", upload.single("audio"), async (req, res) => {
  try {
    const file = fs.readFileSync(req.file.path);
    const audioBytes = file.toString("base64");
    const [response] = await speechClient.recognize({
      audio: { content: audioBytes },
      config: { encoding: "LINEAR16", sampleRateHertz: 16000, languageCode: "en-US" },
    });
    const transcription = response.results.map(r => r.alternatives[0].transcript).join("\n");
    res.json({ text: transcription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Speech-to-Text failed" });
  }
});

// 🗣️ Text-to-Speech Endpoint
app.post("/api/tts", async (req, res) => {
  try {
    const text = req.body.text;
    const [response] = await ttsClient.synthesizeSpeech({
      input: { text },
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      audioConfig: { audioEncoding: "MP3" },
    });
    res.set("Content-Type", "audio/mpeg");
    res.send(response.audioContent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Text-to-Speech failed" });
  }
});

app.listen(5000, () => console.log("✅ STT + TTS API running on http://localhost:5000"));

// ===== Telegram Bot Setup =====
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const youtube = google.youtube({ version: "v3", auth: YOUTUBE_API_KEY });

// Example contacts JSON
const contacts = {
  alice: 123456789,
  bob: 987654321
};

console.log("🤖 Telegram Bot running...");

// Helper: send TTS voice reply
async function sendVoiceReply(chatId, text) {
  try {
    const [ttsResponse] = await ttsClient.synthesizeSpeech({
      input: { text },
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "OGG_OPUS" },
    });
    const replyOgg = path.resolve("reply.ogg");
    fs.writeFileSync(replyOgg, ttsResponse.audioContent, "binary");
    await bot.sendVoice(chatId, fs.createReadStream(replyOgg));
  } catch (err) {
    console.error("TTS error:", err);
    await bot.sendMessage(chatId, "⚠️ Couldn’t generate audio reply.");
  }
}

// Helper: search YouTube
async function searchYouTube(query) {
  const res = await youtube.search.list({
    part: "snippet",
    q: query,
    maxResults: 1,
    type: "video"
  });
  return res.data.items[0]?.id?.videoId;
}

// Handle Telegram messages
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  try {
    let userText = msg.text || "";

    // 🎤 If voice message, convert to text
    if (msg.voice) {
      const file = await bot.getFile(msg.voice.file_id);
      const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_TOKEN}/${file.file_path}`;
      const ogaPath = path.resolve("voice.oga");
      const wavPath = path.resolve("voice.wav");

      const res = await fetch(fileUrl);
      fs.writeFileSync(ogaPath, Buffer.from(await res.arrayBuffer()));

      await new Promise((resolve, reject) => {
        ffmpeg(ogaPath)
          .audioFrequency(16000)
          .audioChannels(1)
          .toFormat("wav")
          .on("end", resolve)
          .on("error", reject)
          .save(wavPath);
      });

      const audioBytes = fs.readFileSync(wavPath).toString("base64");
      const [sttResponse] = await speechClient.recognize({
        audio: { content: audioBytes },
        config: { encoding: "LINEAR16", sampleRateHertz: 16000, languageCode: "en-US" },
      });
      userText = sttResponse.results.map(r => r.alternatives[0].transcript).join("\n") || "Hello";
      console.log("🎤 Transcribed:", userText);
    }

    // ✅ /song command
    if (userText.toLowerCase().startsWith("/song")) {
      const query = userText.replace("/song", "").trim();
      if (!query) return bot.sendMessage(chatId, "Please provide a song name after /song.");
      const videoId = await searchYouTube(query);
      if (videoId) {
        await bot.sendMessage(chatId, `🎶 Here’s your song: https://www.youtube.com/watch?v=${videoId}`);
      } else {
        await bot.sendMessage(chatId, "❌ Could not find the song.");
      }
      return;
    }

    // ✅ /call command
    if (userText.toLowerCase().startsWith("/call")) {
      const name = userText.replace("/call", "").trim().toLowerCase();
      if (contacts[name]) {
        // Simulate call by sending a voice chat link
        await bot.sendMessage(chatId, `📞 Click to start a call with ${name}: https://t.me/joinchat/XXXX`);
      } else {
        await bot.sendMessage(chatId, "❌ Contact not found.");
      }
      return;
    }

    // 💬 Generate AI reply
    const result = await model.generateContent(userText);
    const reply = result.response.text();

    await bot.sendMessage(chatId, reply);
    await sendVoiceReply(chatId, reply);

  } catch (err) {
    console.error("Message handling error:", err);
    bot.sendMessage(msg.chat.id, "⚠️ Something went wrong.");
  }
});
