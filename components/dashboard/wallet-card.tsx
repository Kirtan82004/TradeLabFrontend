"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, TrendingUp, TrendingDown } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store/store"
import { useEffect } from "react"
import { walletService } from "@/lib/wallet"
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
} from "@/store/walletSlice"

export function WalletCard() {
  const dispatch = useDispatch()
  const { wallet, loading, dailyChange } = useSelector((state: RootState) => state.wallet)

  useEffect(() => {
    const fetchWallet = async () => {
      dispatch(fetchStart())
      try {
        const data = await walletService.getWallet()
        dispatch(fetchSuccess(data))
      } catch (error) {
        dispatch(fetchFailure("Failed to fetch wallet"))
      }
    }
    
    if (!wallet) {
      fetchWallet()
    }
  }, [wallet, dispatch])

  const isPositive = dailyChange >= 0

  if (loading || !wallet) {
    return (
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 animate-pulse">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio Balance</CardTitle>
          <Wallet className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="h-8 w-32 bg-gray-200 rounded-md"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio Balance</CardTitle>
        <Wallet className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          ${wallet.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
          {isPositive ? (
            <TrendingUp className="h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {isPositive ? "+" : ""}
            {dailyChange}%
          </span>
          <span>today</span>
        </div>
      </CardContent>
    </Card>
  )
}
