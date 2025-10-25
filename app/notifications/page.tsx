"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { NotificationSettingsComponent } from "@/components/notifications/notification-settings"
import type { NotificationSettings } from "@/lib/notifications"
import { authService } from "@/lib/auth"

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    priceAlerts: true,
    tradeAlerts: true,
    marketNews: false,
    accountUpdates: true,
    systemAlerts: true,
    size: "md",
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const user = authService.getStoredUser()
    if (!user) {
      router.push("/login")
      return
    }

    // In a real app, you'd fetch settings from the API
    setIsLoading(false)
  }, [router])

  const handleUpdateSettings = async (newSettings: Partial<NotificationSettings>) => {
    // In a real app, you'd call notificationService.updateSettings
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading notifications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-2">Manage your notification preferences and price alerts.</p>
        </div>

        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            <NotificationSettingsComponent settings={settings} onUpdateSettings={handleUpdateSettings} />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="relative">
              <NotificationCenter isOpen={true} onClose={() => {}} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
