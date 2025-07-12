"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bell, RefreshCw, TrendingUp, DollarSign, PieChart, BarChart3, AlertTriangle } from "lucide-react"
import { PerformanceMetrics } from "./performance-metrics"
import { PortfolioChart } from "./portfolio-chart"
import { StockTable } from "./stock-table"
import { SectorAllocation } from "./sector-allocation"
import { calculatePortfolio, type PortfolioResult } from "@/lib/portfolio-calculations"

export function Dashboard() {
  const [optimization, setOptimization] = useState("sharpe")
  const [selectedSector, setSelectedSector] = useState("all")
  const [investmentAmount, setInvestmentAmount] = useState(100000)
  const [portfolioData, setPortfolioData] = useState<PortfolioResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load portfolio data on component mount and when parameters change
  useEffect(() => {
    loadPortfolioData()
  }, [optimization, selectedSector, investmentAmount])

  const loadPortfolioData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await calculatePortfolio(
        optimization as "sharpe" | "variance" | "hrp",
        investmentAmount,
        3,
        selectedSector,
      )
      setPortfolioData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to calculate portfolio")
      console.error("Portfolio calculation error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRebalance = () => {
    loadPortfolioData()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Portfolio Dashboard
              </h1>
              <p className="text-slate-600 mt-2">Real-time portfolio optimization using 300+ Indian stocks</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
                <Bell className="h-4 w-4 mr-2" />
                Real Time Alerts
              </Button>
              <Button
                onClick={handleRebalance}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                {isLoading ? "Rebalancing..." : "Rebalance Portfolio"}
              </Button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Investment Amount */}
          <Card className="premium-card border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-800 text-sm font-semibold flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                Investment Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="10000"
                step="10000"
              />
              <p className="text-xs text-slate-600 mt-1">Minimum ₹10,000</p>
            </CardContent>
          </Card>

          {/* Optimization Method */}
          <Card className="premium-card border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-800 text-sm font-bold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                Optimization Method
              </CardTitle>
              <CardDescription className="text-blue-700 font-semibold">
                Choose your portfolio optimization strategy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={optimization} onValueChange={setOptimization}>
                <SelectTrigger className="border-blue-300 bg-white text-blue-800 font-medium hover:border-blue-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sharpe" className="text-blue-800 font-medium">
                    Sharpe Ratio
                  </SelectItem>
                  <SelectItem value="variance" className="text-blue-800 font-medium">
                    Minimum Variance
                  </SelectItem>
                  <SelectItem value="hrp" className="text-blue-800 font-medium">
                    Risk Parity
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-blue-700 font-medium mt-1">
                {optimization === "sharpe" && "Maximize risk-adjusted returns"}
                {optimization === "variance" && "Minimize portfolio volatility"}
                {optimization === "hrp" && "Equal risk contribution"}
              </p>
            </CardContent>
          </Card>

          {/* Sector Filter */}
          <Card className="premium-card border-0 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-emerald-800 text-sm font-bold flex items-center gap-2">
                <PieChart className="h-4 w-4 text-emerald-600" />
                Sector Filter
              </CardTitle>
              <CardDescription className="text-emerald-700 font-semibold">
                Filter portfolio by specific sector
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="border-emerald-300 bg-white text-emerald-800 font-medium hover:border-emerald-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-emerald-800 font-medium">
                    All Sectors
                  </SelectItem>
                  <SelectItem value="technology" className="text-emerald-800 font-medium">
                    Technology
                  </SelectItem>
                  <SelectItem value="financial" className="text-emerald-800 font-medium">
                    Financial
                  </SelectItem>
                  <SelectItem value="energy" className="text-emerald-800 font-medium">
                    Energy
                  </SelectItem>
                  <SelectItem value="consumer" className="text-emerald-800 font-medium">
                    Consumer
                  </SelectItem>
                  <SelectItem value="healthcare" className="text-emerald-800 font-medium">
                    Healthcare
                  </SelectItem>
                  <SelectItem value="telecom" className="text-emerald-800 font-medium">
                    Telecom
                  </SelectItem>
                  <SelectItem value="industrial" className="text-emerald-800 font-medium">
                    Industrial
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-emerald-700 font-medium mt-1">
                {selectedSector === "all"
                  ? "Diversified across all sectors"
                  : `${selectedSector.charAt(0).toUpperCase() + selectedSector.slice(1)} sector focus`}
              </p>
            </CardContent>
          </Card>

          {/* Portfolio Status */}
          <Card className="premium-card border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-800 text-sm font-semibold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-600" />
                Portfolio Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge
                  variant={isLoading ? "secondary" : error ? "destructive" : "default"}
                  className={`w-full justify-center ${
                    isLoading
                      ? "bg-yellow-100 text-yellow-800"
                      : error
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {isLoading ? "Calculating..." : error ? "Error" : "Optimized"}
                </Badge>
                {portfolioData && (
                  <p className="text-xs text-slate-600">{portfolioData.allocations.length} stocks selected</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Error: {error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Performance Metrics */}
        {portfolioData && (
          <PerformanceMetrics
            optimization={optimization}
            investmentAmount={investmentAmount}
            selectedSector={selectedSector}
            portfolioData={portfolioData}
          />
        )}

        {/* Charts and Tables */}
        {portfolioData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <PortfolioChart
              optimization={optimization}
              investmentAmount={investmentAmount}
              selectedSector={selectedSector}
              portfolioData={portfolioData}
            />
            <SectorAllocation
              optimization={optimization}
              selectedSector={selectedSector}
              portfolioData={portfolioData}
            />
          </div>
        )}

        {/* Stock Holdings Table */}
        {portfolioData && (
          <StockTable
            optimization={optimization}
            investmentAmount={investmentAmount}
            selectedSector={selectedSector}
            portfolioData={portfolioData}
          />
        )}
      </div>
    </div>
  )
}
