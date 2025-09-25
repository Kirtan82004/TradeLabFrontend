"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { tradingService, type Trade } from "@/lib/trading"
import { X, TrendingUp, TrendingDown } from "lucide-react"
import { useDispatch,useSelector } from "react-redux"
import { RootState } from "@/store/store"

export function TradeHistoryTable() {
  const [trades, setTrades] = useState<Trade[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [closingTrade, setClosingTrade] = useState<string | null>(null)
  const { toast } = useToast()
 


  useEffect(() => {
    fetchTrades()
    console.log("Fetched trades in useEffect:", trades)
  }, [trades.length])


  const fetchTrades = async () => {
    try {
      const userTrades = await tradingService.getUserTrades()
      console.log("Fetched trades in fetchTrades:", userTrades)
      setTrades(userTrades)
    } catch (error) {
      toast({
        title: "Failed to load trades",
        description: "Could not fetch your trade history",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  const handleCloseTrade = async (tradeId: string) => {
    setClosingTrade(tradeId)
    try {
      
      await tradingService.closeTrade(tradeId)
      toast({
        title: "Trade closed",
        description: "Position has been closed successfully",
      })
      // Refresh trades
      await fetchTrades()
    } catch (error: any) {
      toast({
        title: "Failed to close trade",
        description: error.response?.data?.message || "Could not close position",
        variant: "destructive",
      })
    } finally {
      setClosingTrade(null)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Trade History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Trade History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {trades.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No trades found</p>
            <p className="text-sm text-muted-foreground mt-1">Start trading to see your history here</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Side</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">P&L</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades.map((trade) => (
                  <TableRow key={trade._id}>
                    <TableCell className="font-medium">{trade.symbol}</TableCell>
                    <TableCell>
                      <Badge
                        variant={trade.side === "buy" ? "default" : "secondary"}
                        className={
                          trade.side === "buy"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }
                      >
                        {trade.side === "buy" ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {trade.side.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{trade.quantity}</TableCell>
                    <TableCell className="text-right">{formatCurrency(trade.price)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={trade.status === "open" ? "default" : "secondary"}
                        className={trade.status === "open" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}
                      >
                        {trade.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {trade.pnl !== undefined ? (
                        <span className={trade.pnl >= 0 ? "text-green-600" : "text-red-600"}>
                          {trade.pnl >= 0 ? "+" : ""}
                          {formatCurrency(trade.pnl)}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(trade.createdAt)}</TableCell>
                    <TableCell className="text-center">
                      {trade.status === "open" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCloseTrade(trade._id)}
                          disabled={closingTrade === trade._id}
                          className="h-8 w-8 p-0"
                        >
                          {closingTrade === trade._id ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b border-current"></div>
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
