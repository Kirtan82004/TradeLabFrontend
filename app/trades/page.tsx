"use client"

import { useEffect, useState } from "react"
import { TradeHistoryTable } from "@/components/trades/trade-history-table"
import { TradeSummary } from "@/components/trades/trade-summary"
import { useAppDispatch,useAppSelector } from "@/store/hooks"
import { setTrades as setTrade } from "@/store/tradesSlice"
import { tradingService, type Trade } from "@/lib/trading"

export default function TradesPage() {
  const [trades, setTrades] = useState<Trade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const tradeState = useAppSelector((state) => state.trade.trades)
  

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const userTrades = await tradingService.getUserTrades()
        console.log("Fetched trades in tradepage:", userTrades)
        console.log("tradeState from redux:", tradeState)
        setTrades(userTrades)
        dispatch(setTrade(userTrades)) // Example of dispatching an action

      } catch (err) {
        console.error("Failed to fetch trades:", err)
        setError("Failed to load trades. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchTrades()
  },[])
 // console.log("TradesPage trades:", trades)

  // Summary stats
  const totalTrades = trades.length
  const openTrades = trades.filter((t) => t.status === "open").length
  const totalPnL = trades.reduce((sum, t) => sum + (t.pnl ?? 0), 0)
  const winRate =
    totalTrades > 0
      ? (trades.filter((t) => (t.pnl ?? 0) > 0).length / totalTrades) * 100
      : 0

  //console.log("Trade summary:", { totalTrades, openTrades, totalPnL, winRate })
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Trade History</h1>
        <p className="text-muted-foreground">View and manage your trading positions</p>
      </div>

      {/* Show summary only if trades are loaded */}
      {!loading && !error && trades.length > 0 && (
        <TradeSummary
          totalTrades={totalTrades}
          openTrades={openTrades}
          totalPnL={totalPnL}
          winRate={winRate}
        />
      )}

      {/* Table with states */}
      <div className="mt-6">
        {loading && <p className="text-muted-foreground">Loading trades...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && trades.length === 0 && (
          <p className="text-muted-foreground">No trades found.</p>
        )}
        <TradeHistoryTable />
      </div>
    </div>
  )
}
