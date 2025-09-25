"use client"

import { WalletCard } from "@/components/dashboard/wallet-card"
import { TradeForm } from "@/components/dashboard/trade-form"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { LivePriceWidget } from "@/components/trading/live-price-widget"
import { PriceChart } from "@/components/trading/price-chart"
import { useState, useEffect } from "react"
import { tradingService } from "@/lib/trading"

// 👇 Type define kar diya
type PriceData = {
  symbol: string
  price: number
}

export default function DashboardPage() {
  const [prices, setPrices] = useState<PriceData[]>([])

  useEffect(() => {
    async function fetchPrices() {
      const symbols = ["BTCUSDT", "ETHUSDT", "ADAUSDT", "SOLUSDT"]

      const responses: PriceData[] = await Promise.all(
        symbols.map(async (sym) => {
          const res = await tradingService.getPrice(sym)
          return { symbol: sym, price:(res.price) }
        })
      )

      setPrices(responses)
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Trading Dashboard</h1>
        <p className="text-muted-foreground">Monitor your portfolio and execute trades</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          <StatsCards />

          <div className="grid gap-6 md:grid-cols-2">
            <WalletCard />
            <TradeForm />
          </div>

          <PriceChart symbol="BTCUSDT" />
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <LivePriceWidget />

          <div className="bg-card rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Market Overview</h3>
            <div className="space-y-3">
              {prices.length === 0 ? (
                <p className="text-sm text-muted-foreground">Loading market data...</p>
              ) : (
                prices.map((coin) => (
                  <div
                    key={coin.symbol}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-muted-foreground">
                      {coin.symbol.replace("USDT", "/USDT")}
                    </span>
                    <span
                      className="text-sm font-medium text-green-600"
                    >
                      ${coin.price.toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
