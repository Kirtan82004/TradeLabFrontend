"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"
import { tradingService } from "@/lib/trading"

interface PricePoint {
  time: string
  price: number
}

export function PriceChart({ symbol }: { symbol: string }) {
  const [data, setData] = useState<PricePoint[]>([])

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await tradingService.getPrice(symbol)
        const price = (res.price)

        const newPoint: PricePoint = {
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          price,
        }

        setData((prev) => {
          const updated = [...prev, newPoint]
          // सिर्फ 50 points तक history रखना
          return updated.slice(-50)
        })
      } catch (error) {
        console.error("Failed to fetch price:", error)
      }
    }

    fetchPrice()
    const interval = setInterval(fetchPrice, 5000) // हर 5 सेकंड में नया price
    return () => clearInterval(interval)
  }, [symbol])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Price Chart - {symbol}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                domain={["auto", "auto"]}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Price"]}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
