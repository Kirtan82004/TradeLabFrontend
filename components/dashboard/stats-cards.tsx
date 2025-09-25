"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, DollarSign, TrendingUp, Users } from "lucide-react"
import { tradingService, type Trade } from "@/lib/trading"

type Stats = {
  totalTrades: number
  winRate: number
  totalPnL: number
  activePositions: number
}

export function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const trades: Trade[] = await tradingService.getUserTrades()

        const totalTrades = trades.length
        const closedTrades = trades.filter((t) => t.status === "closed")
        const activePositions = trades.filter((t) => t.status === "open").length

        // Win trades = closed trades with pnl > 0
        const winTrades = closedTrades.filter((t) => (t.pnl ?? 0) > 0).length
        const winRate = closedTrades.length > 0 ? (winTrades / closedTrades.length) * 100 : 0

        // Total PnL = sum of pnl from all closed trades
        const totalPnL = closedTrades.reduce((sum, t) => sum + (t.pnl ?? 0), 0)

        setStats({ totalTrades, winRate, totalPnL, activePositions })
      } catch (err) {
        console.error("Failed to fetch stats", err)
      }
    }

    fetchStats()
  }, [])

  if (!stats) {
    return <p className="text-muted-foreground">Loading stats...</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Trades */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalTrades}</div>
          <p className="text-xs text-muted-foreground">All-time trades</p>
        </CardContent>
      </Card>

      {/* Win Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.winRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">Profitable trades ratio</p>
        </CardContent>
      </Card>

      {/* Total P&L */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${
              stats.totalPnL >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stats.totalPnL >= 0 ? "+" : ""}
            ${stats.totalPnL.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">Overall performance</p>
        </CardContent>
      </Card>

      {/* Active Positions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activePositions}</div>
          <p className="text-xs text-muted-foreground">Currently open trades</p>
        </CardContent>
      </Card>
    </div>
  )
}
