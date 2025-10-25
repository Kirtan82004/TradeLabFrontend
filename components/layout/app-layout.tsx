"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { authService } from "@/lib/auth"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Don't show layout on auth pages
  const isAuthPage = pathname === "/login" || pathname === "/register"

  useEffect(() => {
    if (isAuthPage) {
      setIsLoading(false)
      return
    }

    const user = authService.getStoredUser()
    const token = localStorage.getItem("token")

    if (!user || !token) {
      router.push("/login")
      return
    }

    setIsAuthenticated(true)
    setIsLoading(false)
  }, [router, isAuthPage])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthPage) {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 lg:ml-0">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  )
}
