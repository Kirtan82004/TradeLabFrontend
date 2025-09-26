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
import { useDispatch } from "react-redux"
import { addTrade } from "@/store/tradesSlice"
import { updateBalance } from "@/store/walletSlice"

const POPULAR_SYMBOLS = ["BTCUSDT", "ETHUSDT", "ADAUSDT", "SOLUSDT", "DOTUSDT"]
type TradeSide = "buy" | "sell"

export function TradeForm() {
  const [formState, setFormState] = useState({
    symbol: POPULAR_SYMBOLS[0],
    quantity: "",
    side: "buy" as TradeSide,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const dispatch = useDispatch()

  const handleChange = (key: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }))
  }

  const extractErrorMessage = (error: any) =>
    error?.response?.data?.message || error?.message || "Failed to place trade"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const qty = parseFloat(formState.quantity)

    if (!formState.symbol || isNaN(qty) || qty <= 0) {
      toast({
        title: "Invalid input",
        description: "Please select a trading pair and enter a valid quantity",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const data = await tradingService.placeTrade({
        symbol: formState.symbol,
        quantity: qty,
        side: formState.side,
      })

      dispatch(addTrade(data))

      toast({
        title: "Trade placed successfully!",
        description: `${formState.side.toUpperCase()} ${qty} ${formState.symbol}`,
      })

      const updatedWallet = await walletService.getWallet()
      dispatch(updateBalance(updatedWallet.balance))

      setFormState({ symbol: POPULAR_SYMBOLS[0], quantity: "", side: "buy" })
    } catch (error) {
      toast({
        title: "Trade failed",
        description: extractErrorMessage(error),
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
          {/* Trading Pair */}
          <div className="space-y-2">
            <Label htmlFor="symbol">Trading Pair</Label>
            <Select value={formState.symbol} onValueChange={(val) => handleChange("symbol", val)}>
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

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              step="0.00000001"
              placeholder="Enter quantity"
              value={formState.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
              required
            />
          </div>

          {/* Side Selection */}
          <div className="space-y-2">
            <Label>Order Type</Label>
            <div className="flex gap-2">
              <SideButton
                side="buy"
                active={formState.side === "buy"}
                onClick={() => handleChange("side", "buy")}
              />
              <SideButton
                side="sell"
                active={formState.side === "sell"}
                onClick={() => handleChange("side", "sell")}
              />
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Placing trade..." : `Place ${formState.side.toUpperCase()} Order`}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function SideButton({
  side,
  active,
  onClick,
}: {
  side: TradeSide
  active: boolean
  onClick: () => void
}) {
  const isBuy = side === "buy"
  const Icon = isBuy ? TrendingUp : TrendingDown
  return (
    <Button
      type="button"
      variant={active ? "default" : "outline"}
      className={`flex-1 ${active ? (isBuy ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700") : ""}`}
      onClick={onClick}
    >
      <Icon className="h-4 w-4 mr-1" />
      {isBuy ? "Buy" : "Sell"}
    </Button>
  )
}
