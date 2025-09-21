"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Heart, Menu, Home, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavigationProps {
  userRole?: "elder" | "caregiver"
  userName?: string
}

export function Navigation({ userRole = "elder", userName = "User" }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const elderNavItems = [
    { href: "/elder-dashboard", label: "Dashboard", icon: Home },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  const caregiverNavItems = [
    { href: "/caregiver-dashboard", label: "Dashboard", icon: Home },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  const navItems = userRole === "elder" ? elderNavItems : caregiverNavItems

  const handleLogout = async () => {
    // TODO: Implement Firebase logout
    console.log("Logging out...")
    // Redirect to home page
    window.location.href = "/"
  }

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">SilverMate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button variant={isActive ? "default" : "ghost"} size="lg" className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-foreground font-medium">Hello, {userName}</span>
                <Badge variant="secondary" className="capitalize">
                  {userRole}
                </Badge>
              </div>
              <Button variant="outline" onClick={handleLogout} className="bg-transparent">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="lg">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  {/* User Info */}
                  <div className="border-b border-border pb-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-6 w-6 text-primary" />
                      <span className="text-xl font-bold text-foreground">SilverMate</span>
                    </div>
                    <p className="text-foreground font-medium">Hello, {userName}</p>
                    <Badge variant="secondary" className="capitalize mt-1">
                      {userRole}
                    </Badge>
                  </div>

                  {/* Navigation Items */}
                  <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                          <Button
                            variant={isActive ? "default" : "ghost"}
                            className="w-full justify-start h-12 text-base"
                          >
                            <Icon className="mr-3 h-5 w-5" />
                            {item.label}
                          </Button>
                        </Link>
                      )
                    })}
                  </nav>

                  {/* Logout Button */}
                  <div className="border-t border-border pt-4">
                    <Button variant="outline" onClick={handleLogout} className="w-full h-12 text-base bg-transparent">
                      <LogOut className="mr-3 h-5 w-5" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
