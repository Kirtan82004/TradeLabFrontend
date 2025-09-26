"use client"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, DollarSign, TrendingUp, Users } from "lucide-react"
import { tradingService, type Trade } from "@/lib/trading"

type Stats = {
  totalTrades: number
  winRate: number
  totalPnL: number
  activePositions: number
}

function calculateStats(trades: Trade[]): Stats {
  const totalTrades = trades.length
  const closedTrades = trades.filter((t) => t.status === "closed")
  const activePositions = trades.filter((t) => t.status === "open").length

  const winTrades = closedTrades.filter((t) => (t.pnl ?? 0) > 0).length
  const winRate = closedTrades.length > 0 ? (winTrades / closedTrades.length) * 100 : 0

  const totalPnL = closedTrades.reduce((sum, t) => sum + (t.pnl ?? 0), 0)

  return { totalTrades, winRate, totalPnL, activePositions }
}

type StatCardProps = {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  valueClassName?: string
}

function StatCard({ title, value, description, icon, valueClassName }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueClassName ?? ""}`}>{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  const [trades, setTrades] = useState<Trade[] | null>(null)

  useEffect(() => {
    tradingService
      .getUserTrades()
      .then(setTrades)
      .catch((err) => console.error("Failed to fetch stats", err))
  }, [])

  const stats = useMemo(() => (trades ? calculateStats(trades) : null), [trades])

  if (!stats) {
    return <p className="text-muted-foreground">Loading stats...</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Trades"
        value={stats.totalTrades}
        description="All-time trades"
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Win Rate"
        value={`${stats.winRate.toFixed(1)}%`}
        description="Profitable trades ratio"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Total P&L"
        value={`${stats.totalPnL >= 0 ? "+" : ""}$${stats.totalPnL.toFixed(2)}`}
        description="Overall performance"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        valueClassName={stats.totalPnL >= 0 ? "text-green-600" : "text-red-600"}
      />
      <StatCard
        title="Active Positions"
        value={stats.activePositions}
        description="Currently open trades"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  )
}
