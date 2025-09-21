"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Clock, Bell, Music, Play, Pause, SkipForward, Volume2 } from "lucide-react"

export default function ElderDashboard() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentBhajan, setCurrentBhajan] = useState("Om Jai Jagdish Hare")

  // Mock data - replace with real data from Firebase
  const nextReminder = {
    title: "Take Morning Medication",
    time: "9:00 AM",
    description: "Blood pressure medication with breakfast",
  }

  const upcomingReminders = [
    { id: 1, title: "Lunch Time", time: "12:30 PM", description: "Have your healthy lunch" },
    { id: 2, title: "Evening Walk", time: "5:00 PM", description: "30 minutes walk in the garden" },
    { id: 3, title: "Dinner Medication", time: "8:00 PM", description: "Take evening medicines" },
  ]

  const bhajanPlaylist = [
    "Om Jai Jagdish Hare",
    "Raghupati Raghav Raja Ram",
    "Vaishnav Jan To",
    "Hanuman Chalisa",
    "Gayatri Mantra",
    "Shree Ram Chandra",
  ]

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // TODO: Implement actual audio playback
    console.log(isPlaying ? "Pausing bhajan" : "Playing bhajan")
  }

  const handleNextBhajan = () => {
    const currentIndex = bhajanPlaylist.indexOf(currentBhajan)
    const nextIndex = (currentIndex + 1) % bhajanPlaylist.length
    setCurrentBhajan(bhajanPlaylist[nextIndex])
    console.log("Playing next bhajan:", bhajanPlaylist[nextIndex])
  }

  const handleBhajanRequest = () => {
    // This would be triggered by voice command "I want to play bhajan"
    setIsPlaying(true)
    console.log("Starting bhajan playback from voice request")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="elder" userName="John" />

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Good Morning, John!</h1>
          <p className="text-xl text-muted-foreground">How can I help you today?</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Reminders */}
          <div className="space-y-6">
            {/* Next Reminder Card */}
            <Card className="border-2 border-primary/20">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">Next Reminder</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-foreground">{nextReminder.title}</h3>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {nextReminder.time}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-lg">{nextReminder.description}</p>
                  <Button className="w-full h-12 text-base">
                    <Bell className="mr-2 h-5 w-5" />
                    Mark as Done
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-accent" />
                  <CardTitle className="text-2xl">Upcoming Reminders</CardTitle>
                </div>
                <CardDescription className="text-base">Your scheduled activities for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingReminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{reminder.title}</h4>
                        <p className="text-sm text-muted-foreground">{reminder.description}</p>
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {reminder.time}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Bhajan Player */}
          <div className="space-y-6">
            <Card className="border-2 border-accent/20">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Music className="h-6 w-6 text-accent" />
                  <CardTitle className="text-2xl">Bhajan Player</CardTitle>
                </div>
                <CardDescription className="text-base">Listen to devotional music and bhajans</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Now Playing */}
                <div className="text-center p-6 bg-accent/10 rounded-lg">
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Music className="h-10 w-10 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{currentBhajan}</h3>
                  <p className="text-muted-foreground">{isPlaying ? "Now Playing" : "Ready to Play"}</p>
                </div>

                {/* Player Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleNextBhajan}
                    className="h-14 w-14 rounded-full bg-transparent"
                  >
                    <SkipForward className="h-6 w-6" />
                  </Button>

                  <Button onClick={handlePlayPause} size="lg" className="h-16 w-16 rounded-full text-lg">
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  </Button>

                  <Button variant="outline" size="lg" className="h-14 w-14 rounded-full bg-transparent">
                    <Volume2 className="h-6 w-6" />
                  </Button>
                </div>

                {/* Voice Command Helper */}
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <p className="text-primary font-medium text-base mb-2">💬 Try saying: "I want to play bhajan"</p>
                  <Button
                    variant="outline"
                    onClick={handleBhajanRequest}
                    className="bg-transparent border-primary/30 text-primary hover:bg-primary/10"
                  >
                    Test Voice Command
                  </Button>
                </div>

                {/* Playlist */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Bhajan Playlist</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {bhajanPlaylist.map((bhajan, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentBhajan(bhajan)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          currentBhajan === bhajan
                            ? "bg-primary/20 text-primary font-medium"
                            : "bg-muted/50 hover:bg-muted text-foreground"
                        }`}
                      >
                        {bhajan}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
