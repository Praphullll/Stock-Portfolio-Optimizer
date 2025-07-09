"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { PortfolioChart } from "@/components/portfolio-chart"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { StockTable } from "@/components/stock-table"
import { SectorAllocation } from "@/components/sector-allocation"
import { AlertsDialog } from "@/components/alerts-dialog"
import { RefreshCw, TrendingUp, Shield, BarChart3, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function Dashboard() {
  const [activeOptimization, setActiveOptimization] = useState("sharpe")
  const [isRebalancing, setIsRebalancing] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [investmentAmount, setInvestmentAmount] = useState(100000) // Default to 100k, should come from user input

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRebalance = () => {
    setIsRebalancing(true)
    setTimeout(() => {
      setIsRebalancing(false)
    }, 2000)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600 text-lg">Loading your portfolio dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <Badge className="mb-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
              <Sparkles className="w-4 h-4 mr-2" />
              Live Portfolio
            </Badge>
            <h1 className="text-4xl font-bold mb-3 text-slate-800">Portfolio Dashboard</h1>
            <p className="text-xl text-slate-600">Your AI-optimized investment portfolio overview</p>
          </div>
          <div className="flex gap-3">
            <AlertsDialog />
            <Button
              onClick={handleRebalance}
              disabled={isRebalancing}
              className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRebalancing ? "animate-spin" : ""}`} />
              {isRebalancing ? "Rebalancing..." : "Rebalance Portfolio"}
            </Button>
          </div>
        </div>

        <Tabs value={activeOptimization} onValueChange={setActiveOptimization} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-xl p-2">
            <TabsTrigger
              value="sharpe"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white font-semibold rounded-lg transition-all duration-300"
            >
              <TrendingUp className="h-4 w-4" />
              Sharpe Ratio
            </TabsTrigger>
            <TabsTrigger
              value="variance"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white font-semibold rounded-lg transition-all duration-300"
            >
              <Shield className="h-4 w-4" />
              Min Variance
            </TabsTrigger>
            <TabsTrigger
              value="hrp"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-600 data-[state=active]:text-white font-semibold rounded-lg transition-all duration-300"
            >
              <BarChart3 className="h-4 w-4" />
              HRP
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeOptimization} className="space-y-8">
            <PerformanceMetrics optimization={activeOptimization} />

            <div className="grid lg:grid-cols-2 gap-8">
              <div key={`portfolio-${activeOptimization}`}>
                <PortfolioChart optimization={activeOptimization} />
              </div>
              <div key={`sector-${activeOptimization}`}>
                <SectorAllocation optimization={activeOptimization} />
              </div>
            </div>

            <StockTable optimization={activeOptimization} investmentAmount={investmentAmount} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
