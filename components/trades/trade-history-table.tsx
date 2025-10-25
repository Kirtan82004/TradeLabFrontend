"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { X, TrendingUp, TrendingDown } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchTrades, closeTrade } from "@/store/tradesSlice"

export function TradeHistoryTable() {
  const dispatch = useAppDispatch()
  const { trades, loading, closingTradeId, error } = useAppSelector((state) => state.trade)
  const { toast } = useToast()
console.log("trades", trades)
  // Fetch trades on mount
  useEffect(() => {
    dispatch(fetchTrades())
  }, [dispatch])

  // Show error via toast if any
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    }
  }, [error, toast])

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  if (loading) {
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
                          onClick={() => dispatch(closeTrade(trade._id))}
                          disabled={closingTradeId === trade._id}
                          className="h-8 w-8 p-0"
                        >
                          {closingTradeId === trade._id ? (
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
