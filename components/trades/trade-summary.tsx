"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react"

interface TradeSummaryProps {
  totalTrades?: number
  openTrades?: number
  totalPnL?: number
  winRate?: number
}

export function TradeSummary({
  totalTrades = 0,
  openTrades = 0,
  totalPnL = 0,
  winRate = 0,
}: TradeSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {/* Total Trades */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" aria-label="Total Trades" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalTrades.toLocaleString("en-US")}
          </div>
          <p className="text-xs text-muted-foreground">All time trades</p>
        </CardContent>
      </Card>

      {/* Open Positions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" aria-label="Open Positions" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {openTrades.toLocaleString("en-US")}
          </div>
          <p className="text-xs text-muted-foreground">Active trades</p>
        </CardContent>
      </Card>

      {/* Total P&L */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" aria-label="Total P&L" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${totalPnL >= 0 ? "text-green-600" : "text-red-600"}`}>
            {totalPnL >= 0 ? "+" : ""}$
            {totalPnL.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <p className="text-xs text-muted-foreground">Realized gains/losses</p>
        </CardContent>
      </Card>

      {/* Win Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          {winRate >= 50 ? (
            <TrendingUp className="h-4 w-4 text-green-500" aria-label="Win Rate Up" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" aria-label="Win Rate Down" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${winRate >= 50 ? "text-green-600" : "text-red-600"}`}>
            {winRate.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">Successful trades</p>
        </CardContent>
      </Card>
    </div>
  )
}
