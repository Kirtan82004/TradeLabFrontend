// trading.ts
import api from "./api"

export interface Trade {
  _id: string
  symbol: string
  side: "buy" | "sell"
  quantity: number
  price: number
  status: "open" | "closed"
  pnl?: number
  createdAt: string
  closedAt?: string
}

export interface PlaceTradeRequest {
  symbol: string
  quantity: number
  side: "buy" | "sell"
}

export const tradingService = {
  async placeTrade(trade: PlaceTradeRequest): Promise<Trade> {
    const response = await api.post("/trade/place", trade)
    return response.data // <-- make sure you return the array/object you need
  },

  async getUserTrades(): Promise<Trade[]> {
    const response = await api.get("/user/trades")
    return response.data// <-- return only the array of trades
  },

  async closeTrade(tradeId: string): Promise<Trade> {
    console.log("Closing trade with ID in :", tradeId)
    const response = await api.post(`/trade/close/${tradeId}`)
    return response.data // <-- return updated trade
  },

  async getPrice(symbol: string): Promise<{ symbol: string; price: number }> {
    const response = await api.get(`/trades/live-price/${symbol}`)
    return response.data
  },
}
