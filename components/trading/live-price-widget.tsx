"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import { tradingService } from "@/lib/trading"
import { socketService } from "@/lib/socket"

const SYMBOLS = ["BTCUSDT", "ETHUSDT", "ADAUSDT", "SOLUSDT", "DOTUSDT"]

interface PriceData {
  symbol: string
  price: number
  change24h?: number
  lastUpdate: Date
}

export function LivePriceWidget() {
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT")
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(false)

  // 📡 Socket subscription
  useEffect(() => {
    const socket = socketService.connect()

    const handleUpdate = (data: { symbol: string; price: number; change24h?: number }) => {
      if (data.symbol === selectedSymbol) {
        setPriceData({
          symbol: data.symbol,
          price: data.price,
          change24h: data.change24h,
          lastUpdate: new Date(),
        })
        setIsLoading(false)
      }
    }

    socket.on("connect", () => setIsConnected(true))
    socket.on("disconnect", () => setIsConnected(false))
    socket.on("priceUpdate", handleUpdate)

    return () => {
      socket.off("priceUpdate", handleUpdate)
      socketService.disconnect()
    }
  }, [selectedSymbol])

  // 🌐 REST fallback fetch
  useEffect(() => {
    setIsLoading(true)
    fetchPrice()
    const interval = setInterval(fetchPrice, 1000)
    return () => clearInterval(interval)
  }, [selectedSymbol])

  const fetchPrice = async () => {
    try {
      const data = await tradingService.getPrice(selectedSymbol)
      setPriceData({
        symbol: data.symbol,
        price: data.price,
        change24h: Math.random() * 10 - 5, // ⚠️ Replace mock with API real %change
        lastUpdate: new Date(),
      })
    } catch (error) {
      console.error("Failed to fetch price:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // 🛠️ Helpers
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(price)

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Live Price
          </CardTitle>
          <Badge
            variant={isConnected ? "default" : "secondary"}
            className={isConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
          >
            {isConnected ? "Live" : "Offline"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Symbol Selector */}
        <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
          <SelectTrigger>
            <SelectValue placeholder="Select symbol" />
          </SelectTrigger>
          <SelectContent>
            {SYMBOLS.map((symbol) => (
              <SelectItem key={symbol} value={symbol}>
                {symbol}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Price Display */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : priceData ? (
          <div className="space-y-3 text-center">
            <div className="text-3xl font-bold text-foreground">{formatPrice(priceData.price)}</div>

            {priceData.change24h !== undefined && (
              <div className="flex items-center justify-center gap-1 mt-1">
                {priceData.change24h >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${priceData.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {priceData.change24h >= 0 ? "+" : ""}
                  {priceData.change24h.toFixed(2)}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">24h</span>
              </div>
            )}

            <div className="text-xs text-muted-foreground">Last updated: {formatTime(priceData.lastUpdate)}</div>
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">Failed to load price data</div>
        )}
      </CardContent>
    </Card>
  )
}
