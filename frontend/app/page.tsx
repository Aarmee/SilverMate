import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Clock, BookOpen, AlertTriangle, Globe } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">SilverMate</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://t.me/SilverMateBot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="lg" className="text-lg">
                  Chat Bot
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
            SilverMate – AI Companion for Elders
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Your trusted companion for daily reminders, mood tracking, journaling, and emergency support. Stay connected
            with your loved ones and maintain your independence with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/SilverMateBot"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="text-lg px-8 py-6 h-auto">
                Start Chatting Now
              </Button>
            </a>
            <a
              href="https://t.me/SilverMateBot"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto bg-transparent">
                Chat Bot
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">Everything You Need to Stay Connected</h2>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto text-pretty">
            SilverMate provides comprehensive support for daily living, emotional well-being, and emergency situations.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Smart Reminders</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Never miss important medications, appointments, or daily tasks with personalized reminders.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Mood Check</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track your emotional well-being and share updates with your caregivers automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Digital Journaling</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Record your thoughts, memories, and daily experiences with text or voice notes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Emergency Alert</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Instantly notify your caregivers and family members in case of emergencies.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Multilingual Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Available in English, Hindi, and Gujarati to serve diverse communities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Family Connection</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Keep your loved ones informed and connected through our caregiver dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">Ready to Start Your Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Chat directly with our Telegram bot and experience SilverMate today!
          </p>
          <a
            href="https://t.me/Silvermate_bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              Chat with Bot Now
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">SilverMate</span>
            </div>
            <div className="flex items-center gap-6 text-muted-foreground">
              <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="/support" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2024 SilverMate. Made with care for our elders.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
