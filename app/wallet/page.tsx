"use client"

import { WalletCard } from "@/components/dashboard/wallet-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react"

export default function WalletPage() {
  const transactions = [
    { id: 1, type: "deposit", amount: 5000, date: "2024-01-15", status: "completed" },
    { id: 2, type: "trade", amount: -1250, date: "2024-01-14", status: "completed" },
    { id: 3, type: "trade", amount: 850, date: "2024-01-13", status: "completed" },
    { id: 4, type: "withdrawal", amount: -500, date: "2024-01-12", status: "pending" },
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Wallet</h1>
        <p className="text-muted-foreground">Manage your trading balance and transactions</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <WalletCard />
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {transaction.type === "deposit" ? (
                        <ArrowDownLeft className="h-4 w-4 text-green-500" />
                      ) : transaction.type === "withdrawal" ? (
                        <ArrowUpRight className="h-4 w-4 text-red-500" />
                      ) : (
                        <Wallet className="h-4 w-4 text-blue-500" />
                      )}
                      <div>
                        <p className="font-medium capitalize">{transaction.type}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <p
                        className={`text-xs ${
                          transaction.status === "completed" ? "text-green-600" : "text-yellow-600"
                        }`}
                      >
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
