"use client"

import { useState, useEffect } from "react"
import { authService, type User } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"
import { Bell, UserIcon } from "@/components/ui/icons"

export function Header() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = authService.getStoredUser()
    setUser(storedUser)
  }, [])

  if (!user) return null

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="lg:hidden">{/* Space for mobile menu button */}</div>

        <div className="flex items-center gap-4 ml-auto">
          <Badge variant="outline" className="hidden sm:flex">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Market Open
          </Badge>

          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <Bell className="h-4 w-4 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1 bg-accent rounded-lg">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{user.email.split("@")[0]}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
