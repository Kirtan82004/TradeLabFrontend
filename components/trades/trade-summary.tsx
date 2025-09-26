"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react"

interface TradeSummaryProps {
  totalTrades?: number
  openTrades?: number
  totalPnL?: number
  winRate?: number
}

interface StatCardProps {
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

export function TradeSummary({
  totalTrades = 0,
  openTrades = 0,
  totalPnL = 0,
  winRate = 0,
}: TradeSummaryProps) {
  const formattedTotalTrades = totalTrades.toLocaleString("en-US")
  const formattedOpenTrades = openTrades.toLocaleString("en-US")
  const formattedPnL = `${totalPnL >= 0 ? "+" : ""}$${totalPnL.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
  const formattedWinRate = `${winRate.toFixed(1)}%`

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <StatCard
        title="Total Trades"
        value={formattedTotalTrades}
        description="All time trades"
        icon={<Activity className="h-4 w-4 text-muted-foreground" aria-label="Total Trades" />}
      />

      <StatCard
        title="Open Positions"
        value={formattedOpenTrades}
        description="Active trades"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" aria-label="Open Positions" />}
      />

      <StatCard
        title="Total P&L"
        value={formattedPnL}
        description="Realized gains/losses"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" aria-label="Total P&L" />}
        valueClassName={totalPnL >= 0 ? "text-green-600" : "text-red-600"}
      />

      <StatCard
        title="Win Rate"
        value={formattedWinRate}
        description="Successful trades"
        icon={
          winRate >= 50 ? (
            <TrendingUp className="h-4 w-4 text-green-500" aria-label="Win Rate Up" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" aria-label="Win Rate Down" />
          )
        }
        valueClassName={winRate >= 50 ? "text-green-600" : "text-red-600"}
      />
    </div>
  )
}
