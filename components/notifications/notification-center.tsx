"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Bell, Check, Trash2, Settings, TrendingUp, Shield, Info } from "@/components/ui/icons"
import { type Notification, mockNotifications } from "@/lib/notifications"
import { formatDistanceToNow } from "date-fns"

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isLoading, setIsLoading] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "trade":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "price_alert":
        return <Bell className="h-4 w-4 text-yellow-500" />
      case "market":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      case "account":
        return <Shield className="h-4 w-4 text-purple-500" />
      case "system":
        return <Info className="h-4 w-4 text-gray-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "trade":
        return "bg-green-500/10 border-green-500/20"
      case "price_alert":
        return "bg-yellow-500/10 border-yellow-500/20"
      case "market":
        return "bg-blue-500/10 border-blue-500/20"
      case "account":
        return "bg-purple-500/10 border-purple-500/20"
      case "system":
        return "bg-gray-500/10 border-gray-500/20"
      default:
        return "bg-muted"
    }
  }

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const handleDelete = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Notification panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-lg lg:absolute lg:top-full lg:right-0 lg:h-auto lg:max-h-96 lg:rounded-lg lg:border lg:shadow-md">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                <Check className="h-3 w-3" />
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <Settings className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
              ×
            </Button>
          </div>
        </div>

        <ScrollArea className="h-full max-h-80 lg:max-h-64">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Bell className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    className={`p-3 rounded-lg transition-colors hover:bg-accent/50 ${
                      !notification.read ? "bg-accent/20" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-1.5 rounded-full ${getNotificationColor(notification.type)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-medium text-sm text-foreground">{notification.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                            </p>
                          </div>

                          <div className="flex items-center gap-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="h-6 w-6 p-0"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(notification.id)}
                              className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < notifications.length - 1 && <Separator className="my-1" />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}
