import api from "./api"

export interface Notification {
  id: string
  type: "trade" | "price_alert" | "market" | "account" | "system"
  title: string
  message: string
  read: boolean
  createdAt: string
  data?: {
    symbol?: string
    price?: number
    tradeId?: string
    amount?: number
    [key: string]: any
  }
}

export interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  priceAlerts: boolean
  tradeAlerts: boolean
  marketNews: boolean
  accountUpdates: boolean
  systemAlerts: boolean
  size:string
}

export interface PriceAlert {
  id: string
  symbol: string
  condition: "above" | "below"
  targetPrice: number
  currentPrice: number
  active: boolean
  createdAt: string
}

export const notificationService = {
  async getNotifications(page = 1, limit = 20): Promise<{ notifications: Notification[]; total: number }> {
    const response = await api.get(`/notifications?page=${page}&limit=${limit}`)
    return response
  },

  async markAsRead(notificationId: string): Promise<void> {
    await api.put(`/notifications/${notificationId}/read`)
  },

  async markAllAsRead(): Promise<void> {
    await api.put("/notifications/read-all")
  },

  async deleteNotification(notificationId: string): Promise<void> {
    await api.delete(`/notifications/${notificationId}`)
  },

  async getSettings(): Promise<NotificationSettings> {
    const response = await api.get("/notifications/settings")
    return response
  },

  async updateSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    const response = await api.put("/notifications/settings", settings)
    return response
  },

  async getPriceAlerts(): Promise<PriceAlert[]> {
    const response = await api.get("/notifications/price-alerts")
    return response
  },

  async createPriceAlert(symbol: string, condition: "above" | "below", targetPrice: number): Promise<PriceAlert> {
    const response = await api.post("/notifications/price-alerts", { symbol, condition, targetPrice })
    return response
  },

  async deletePriceAlert(alertId: string): Promise<void> {
    await api.delete(`/notifications/price-alerts/${alertId}`)
  },

  async togglePriceAlert(alertId: string, active: boolean): Promise<void> {
    await api.put(`/notifications/price-alerts/${alertId}`, { active })
  },
}

// Mock data for development
export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "trade",
    title: "Trade Executed",
    message: "Your buy order for 0.5 BTC at $45,230 has been executed successfully.",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    data: { symbol: "BTC", amount: 0.5, price: 45230, tradeId: "trade_123" },
  },
  {
    id: "2",
    type: "price_alert",
    title: "Price Alert Triggered",
    message: "ETH has reached your target price of $3,200.",
    read: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    data: { symbol: "ETH", price: 3200 },
  },
  {
    id: "3",
    type: "market",
    title: "Market Update",
    message: "Bitcoin breaks $45,000 resistance level with strong volume.",
    read: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    data: { symbol: "BTC", price: 45000 },
  },
  {
    id: "4",
    type: "account",
    title: "Security Alert",
    message: "New login detected from Chrome on Windows.",
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur tonight from 2-4 AM EST.",
    read: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
]

export const mockPriceAlerts: PriceAlert[] = [
  {
    id: "1",
    symbol: "BTC",
    condition: "above",
    targetPrice: 50000,
    currentPrice: 45230,
    active: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    symbol: "ETH",
    condition: "below",
    targetPrice: 3000,
    currentPrice: 3150,
    active: true,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    symbol: "ADA",
    condition: "above",
    targetPrice: 0.5,
    currentPrice: 0.42,
    active: false,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
]
