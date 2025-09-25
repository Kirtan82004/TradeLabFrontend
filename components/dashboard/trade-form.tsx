"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { tradingService } from "@/lib/trading"
import { walletService } from "@/lib/wallet"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store/store"
import { addTrade } from "@/store/tradesSlice"
import { updateBalance } from "@/store/walletSlice"

const POPULAR_SYMBOLS = ["BTCUSDT", "ETHUSDT", "ADAUSDT", "SOLUSDT", "DOTUSDT"]
const DEFAULT_SIDE: "buy" | "sell" = "buy"

export function TradeForm() {
  const [symbol, setSymbol] = useState(POPULAR_SYMBOLS[0])
  const [quantity, setQuantity] = useState("")
  const [side, setSide] = useState<"buy" | "sell">(DEFAULT_SIDE)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const dispatch = useDispatch()
  const { trades, loading, error } = useSelector((state: RootState) => state.trade)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const qty = parseFloat(quantity)
    if (!symbol || isNaN(qty) || qty <= 0) {
      toast({
        title: "Invalid input",
        description: "Please select a trading pair and enter a valid quantity",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const data = await tradingService.placeTrade({ symbol, quantity: qty, side })
      // Update trades in Redux store
      dispatch(addTrade(data))
      // Show success toast
      toast({
        title: "Trade placed successfully!",
        description: `${side.toUpperCase()} ${qty} ${symbol}`,
      })

      // Refresh wallet (if you want WalletCard to update)
      const updatedWallet = await walletService.getWallet()
      dispatch(updateBalance(updatedWallet.balance))
      console.log("Updated wallet:", updatedWallet)

      // Reset form
      setSymbol(POPULAR_SYMBOLS[0])
      setQuantity("")
      setSide(DEFAULT_SIDE)
    } catch (error: any) {
      toast({
        title: "Trade failed",
        description: error?.response?.data?.message || error?.message || "Failed to place trade",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Place Trade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symbol">Trading Pair</Label>
            <Select value={symbol} onValueChange={setSymbol}>
              <SelectTrigger>
                <SelectValue placeholder="Select trading pair" />
              </SelectTrigger>
              <SelectContent>
                {POPULAR_SYMBOLS.map((sym) => (
                  <SelectItem key={sym} value={sym}>
                    {sym}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              step="0.00000001"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Order Type</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={side === "buy" ? "default" : "outline"}
                className={`flex-1 ${side === "buy" ? "bg-green-600 hover:bg-green-700" : ""}`}
                onClick={() => setSide("buy")}
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Buy
              </Button>
              <Button
                type="button"
                variant={side === "sell" ? "default" : "outline"}
                className={`flex-1 ${side === "sell" ? "bg-red-600 hover:bg-red-700" : ""}`}
                onClick={() => setSide("sell")}
              >
                <TrendingDown className="h-4 w-4 mr-1" />
                Sell
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Placing trade..." : `Place ${side.toUpperCase()} Order`}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
