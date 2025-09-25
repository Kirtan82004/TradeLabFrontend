
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppLayout } from "@/components/layout/app-layout"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "./providers";


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TradeLab - Crypto Trading Simulator",
  description: "Professional crypto trading simulator for learning and practice",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <AppLayout>{children}</AppLayout>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
