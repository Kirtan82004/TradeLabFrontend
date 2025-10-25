"use client"

import { useState, useEffect, useRef } from "react"
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
const intervalRef = useRef<number | null>(null)

  // 📅 Format time consistently
  const formatTime = (date: Date) => date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await tradingService.getPrice(symbol)
        const newPrice = res.price

        setData((prev) => {
          const lastPrice = prev[prev.length - 1]?.price
          if (lastPrice === newPrice) return prev // avoid duplicate points

          const newPoint: PricePoint = {
            time: formatTime(new Date()),
            price: newPrice,
          }

          return [...prev.slice(-49), newPoint] // keep last 50 points
        })
      } catch (error) {
        console.error("Failed to fetch price:", error)
      }
    }

    fetchPrice()
    intervalRef.current = window.setInterval(fetchPrice, 5000) // fetch every 5s

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
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
          {data.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Loading chart...
            </div>
          ) : (
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
                    borderRadius: 6,
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
          )}
        </div>
      </CardContent>
    </Card>
  )
}
