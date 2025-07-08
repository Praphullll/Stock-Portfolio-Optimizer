"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Shield, Target, Lightbulb } from "lucide-react"
import { calculatePortfolio } from "@/lib/portfolio-calculations"

interface PerformanceMetricsProps {
  optimization: string
}

export function PerformanceMetrics({ optimization }: PerformanceMetricsProps) {
  const investmentAmount = 50000
  const horizon = 3

  // Calculate portfolio using exact Python implementation
  const portfolioResult = calculatePortfolio(optimization as "sharpe" | "variance" | "hrp", investmentAmount, horizon)

  // Format metrics exactly as shown in Python output
  const metrics = {
    expectedReturn: `${(portfolioResult.expectedReturn * 100).toFixed(2)}%`, // port_return * 100
    projectedValue: `₹${Math.round(portfolioResult.projectedValue).toLocaleString()}`, // investment * ((1 + port_return) ** horizon)
    volatility: `${(portfolioResult.portfolioRisk * 100).toFixed(2)}%`, // port_risk * 100
    sharpeRatio: portfolioResult.sharpeRatio.toFixed(2), // (port_return - risk_free_rate) / port_risk
    var95: `₹${Math.round(portfolioResult.var95).toLocaleString()}`, // calculate_var result
    insight: portfolioResult.insight,
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <Card className="premium-card border-0 bg-gradient-to-br from-emerald-50 to-teal-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-600">Expected Return</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <span className="text-2xl font-bold text-emerald-700">{metrics.expectedReturn}</span>
          </div>
          <div className="text-xs text-emerald-600 mt-1 font-medium">Annual Return</div>
        </CardContent>
      </Card>

      <Card className="premium-card border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-600">Projected Value</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span className="text-xl font-bold text-blue-700">{metrics.projectedValue}</span>
          </div>
          <div className="text-xs text-blue-600 mt-1 font-medium">After {horizon} years</div>
        </CardContent>
      </Card>

      <Card className="premium-card border-0 bg-gradient-to-br from-purple-50 to-violet-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-600">Portfolio Risk</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-purple-600" />
            <span className="text-2xl font-bold text-purple-700">{metrics.volatility}</span>
          </div>
          <div className="text-xs text-purple-600 mt-1 font-medium">Standard Deviation</div>
        </CardContent>
      </Card>

      <Card className="premium-card border-0 bg-gradient-to-br from-orange-50 to-red-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-600">Sharpe Ratio</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-orange-600" />
            <span className="text-2xl font-bold text-orange-700">{metrics.sharpeRatio}</span>
          </div>
          <div className="text-xs text-orange-600 mt-1 font-medium">Risk-Adjusted Return</div>
        </CardContent>
      </Card>

      <Card className="premium-card border-0 bg-gradient-to-br from-red-50 to-pink-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-600">VaR (95%)</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center space-x-2">
            <TrendingDown className="h-5 w-5 text-red-600" />
            <span className="text-xl font-bold text-red-700">{metrics.var95}</span>
          </div>
          <div className="text-xs text-red-600 mt-1 font-medium">Max Expected Loss</div>
        </CardContent>
      </Card>

      <Card className="premium-card border-0 bg-gradient-to-br from-yellow-50 to-amber-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-600">Insights</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-start space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
            <span className="text-sm font-semibold text-slate-700 leading-tight">{metrics.insight}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
