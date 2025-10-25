"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { authService, type User } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, UserIcon } from "@/components/ui/icons"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { mockNotifications } from "@/lib/notifications"

export function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const storedUser = authService.getStoredUser()
    setUser(storedUser)
  }, [])

  if (!user) return null

  const unreadCount = mockNotifications.filter((n) => !n.read).length

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="lg:hidden">{/* Space for mobile menu button */}</div>

        <div className="flex items-center gap-4 ml-auto">
          <Badge variant="outline" className="hidden sm:flex">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Market Open
          </Badge>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <Bell className="h-4 w-4 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Button>

            <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
          </div>

          <Link href="/profile">
            <div className="flex items-center gap-2 px-3 py-1 bg-accent rounded-lg hover:bg-accent/80 transition-colors cursor-pointer">
              <UserIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{user.email.split("@")[0]}</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
