"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bell, Mail, Smartphone, TrendingUp, AlertTriangle, Plus, Trash2 } from "@/components/ui/icons"
import { type NotificationSettings, type PriceAlert, mockPriceAlerts } from "@/lib/notifications"
import { useToast } from "@/hooks/use-toast"

interface NotificationSettingsProps {
  settings: NotificationSettings
  onUpdateSettings: (settings: Partial<NotificationSettings>) => Promise<void>
}

export function NotificationSettingsComponent({ settings, onUpdateSettings }: NotificationSettingsProps) {
  const [localSettings, setLocalSettings] = useState(settings)
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>(mockPriceAlerts)
  const [newAlert, setNewAlert] = useState({
    symbol: "",
    condition: "above" as "above" | "below",
    targetPrice: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSettingChange = async (key: keyof NotificationSettings, value: boolean) => {
    const updatedSettings = { ...localSettings, [key]: value }
    setLocalSettings(updatedSettings)

    try {
      await onUpdateSettings({ [key]: value })
      toast({
        title: "Settings updated",
        description: "Your notification preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings.",
        variant: "destructive",
      })
      // Revert on error
      setLocalSettings(localSettings)
    }
  }

  const handleCreatePriceAlert = async () => {
    if (!newAlert.symbol || !newAlert.targetPrice) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    const alert: PriceAlert = {
      id: Date.now().toString(),
      symbol: newAlert.symbol.toUpperCase(),
      condition: newAlert.condition,
      targetPrice: Number.parseFloat(newAlert.targetPrice),
      currentPrice: 0, // Would be fetched from API
      active: true,
      createdAt: new Date().toISOString(),
    }

    setPriceAlerts((prev) => [alert, ...prev])
    setNewAlert({ symbol: "", condition: "above", targetPrice: "" })

    toast({
      title: "Price alert created",
      description: `Alert set for ${alert.symbol} ${alert.condition} $${alert.targetPrice}`,
    })
  }

  const handleDeleteAlert = (alertId: string) => {
    setPriceAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
    toast({
      title: "Alert deleted",
      description: "Price alert has been removed.",
    })
  }

  const handleToggleAlert = (alertId: string) => {
    setPriceAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, active: !alert.active } : alert)))
  }

  return (
    <div className="space-y-6">
      {/* General Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Choose how you want to receive notifications about your trading activity.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
            </div>
            <Switch
              id="email-notifications"
              checked={localSettings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
              </div>
            </div>
            <Switch
              id="push-notifications"
              checked={localSettings.pushNotifications}
              onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label htmlFor="trade-alerts">Trade Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when your trades are executed</p>
              </div>
            </div>
            <Switch
              id="trade-alerts"
              checked={localSettings.tradeAlerts}
              onCheckedChange={(checked) => handleSettingChange("tradeAlerts", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label htmlFor="price-alerts">Price Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive alerts when prices hit your targets</p>
              </div>
            </div>
            <Switch
              id="price-alerts"
              checked={localSettings.priceAlerts}
              onCheckedChange={(checked) => handleSettingChange("priceAlerts", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label htmlFor="market-news">Market News</Label>
                <p className="text-sm text-muted-foreground">Stay updated with market news and analysis</p>
              </div>
            </div>
            <Switch
              id="market-news"
              checked={localSettings.marketNews}
              onCheckedChange={(checked) => handleSettingChange("marketNews", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label htmlFor="account-updates">Account Updates</Label>
                <p className="text-sm text-muted-foreground">Important updates about your account</p>
              </div>
            </div>
            <Switch
              id="account-updates"
              checked={localSettings.accountUpdates}
              onCheckedChange={(checked) => handleSettingChange("accountUpdates", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Price Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Price Alerts
          </CardTitle>
          <CardDescription>Set up custom price alerts for your favorite cryptocurrencies.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Create New Alert */}
          <div className="p-4 border border-border rounded-lg space-y-4">
            <h4 className="font-medium">Create New Alert</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <Label htmlFor="symbol">Symbol</Label>
                <Input
                  id="symbol"
                  placeholder="BTC"
                  value={newAlert.symbol}
                  onChange={(e) => setNewAlert((prev) => ({ ...prev, symbol: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="condition">Condition</Label>
                <Select
                  value={newAlert.condition}
                  onValueChange={(value: "above" | "below") => setNewAlert((prev) => ({ ...prev, condition: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="above">Above</SelectItem>
                    <SelectItem value="below">Below</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Target Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="50000"
                  value={newAlert.targetPrice}
                  onChange={(e) => setNewAlert((prev) => ({ ...prev, targetPrice: e.target.value }))}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleCreatePriceAlert} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Alert
                </Button>
              </div>
            </div>
          </div>

          {/* Existing Alerts */}
          <div className="space-y-3">
            {priceAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant={alert.active ? "default" : "secondary"}>{alert.symbol}</Badge>
                  <span className="text-sm">
                    {alert.condition} ${alert.targetPrice.toLocaleString()}
                  </span>
                  {!alert.active && (
                    <Badge variant="outline" className="text-xs">
                      Inactive
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={alert.active} onCheckedChange={() => handleToggleAlert(alert.id)} />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteAlert(alert.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
