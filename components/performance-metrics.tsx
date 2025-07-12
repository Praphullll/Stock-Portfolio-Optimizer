"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Shield, Target, AlertTriangle, BarChart3, Lightbulb } from "lucide-react"

interface PerformanceMetricsProps {
  optimization: string
  investmentAmount: number
  selectedSector?: string
}

export function PerformanceMetrics({ optimization, investmentAmount, selectedSector }: PerformanceMetricsProps) {
  const getMetrics = (method: string, sector?: string) => {
    // Base metrics for different optimization methods
    const baseMetrics = {
      sharpe: {
        expectedReturn: 14.2,
        volatility: 18.5,
        sharpeRatio: 0.76,
        var95: 12.8,
        maxDrawdown: 15.3,
        insight: "Balanced risk-return profile with strong diversification",
      },
      variance: {
        expectedReturn: 11.8,
        volatility: 12.4,
        sharpeRatio: 0.95,
        var95: 8.9,
        maxDrawdown: 10.2,
        insight: "Conservative approach prioritizing capital preservation",
      },
      hrp: {
        expectedReturn: 13.1,
        volatility: 15.7,
        sharpeRatio: 0.83,
        var95: 11.2,
        maxDrawdown: 12.8,
        insight: "Hierarchical diversification reducing correlation risk",
      },
    }

    let metrics = baseMetrics[method as keyof typeof baseMetrics] || baseMetrics.sharpe

    // Apply sector-specific adjustments
    if (sector && sector !== "all") {
      const sectorAdjustments = {
        technology: {
          returnMultiplier: 1.25,
          volatilityMultiplier: 1.4,
          varMultiplier: 1.3,
          insight: "High-growth tech sector with elevated volatility but strong returns",
        },
        financial: {
          returnMultiplier: 1.1,
          volatilityMultiplier: 1.15,
          varMultiplier: 1.1,
          insight: "Stable financial sector with moderate growth and dividend income",
        },
        energy: {
          returnMultiplier: 1.3,
          volatilityMultiplier: 1.6,
          varMultiplier: 1.5,
          insight: "Cyclical energy sector with high returns but significant volatility",
        },
        consumer: {
          returnMultiplier: 0.95,
          volatilityMultiplier: 0.8,
          varMultiplier: 0.85,
          insight: "Defensive consumer sector offering stability and consistent returns",
        },
        healthcare: {
          returnMultiplier: 1.05,
          volatilityMultiplier: 0.9,
          varMultiplier: 0.9,
          insight: "Healthcare sector providing steady growth with lower volatility",
        },
        telecom: {
          returnMultiplier: 0.85,
          volatilityMultiplier: 0.75,
          varMultiplier: 0.8,
          insight: "Telecom sector focused on dividend yield with lower growth",
        },
      }

      const adjustment = sectorAdjustments[sector as keyof typeof sectorAdjustments]
      if (adjustment) {
        metrics = {
          expectedReturn: metrics.expectedReturn * adjustment.returnMultiplier,
          volatility: metrics.volatility * adjustment.volatilityMultiplier,
          sharpeRatio:
            (metrics.expectedReturn * adjustment.returnMultiplier) /
            (metrics.volatility * adjustment.volatilityMultiplier),
          var95: metrics.var95 * adjustment.varMultiplier,
          maxDrawdown: metrics.maxDrawdown * adjustment.varMultiplier,
          insight: adjustment.insight,
        }
      }
    }

    return metrics
  }

  const metrics = getMetrics(optimization, selectedSector)
  const varAmount = (investmentAmount * metrics.var95) / 100

  const getSectorDisplayName = (sector: string) => {
    const sectorNames = {
      technology: "Technology",
      financial: "Financial",
      energy: "Energy",
      consumer: "Consumer",
      healthcare: "Healthcare",
      telecom: "Telecom",
    }
    return sectorNames[sector as keyof typeof sectorNames] || sector
  }

  const getInsightColor = (sector?: string) => {
    if (!sector || sector === "all") return "bg-blue-50 text-blue-700 border-blue-200"

    const colors = {
      technology: "bg-purple-50 text-purple-700 border-purple-200",
      financial: "bg-green-50 text-green-700 border-green-200",
      energy: "bg-orange-50 text-orange-700 border-orange-200",
      consumer: "bg-indigo-50 text-indigo-700 border-indigo-200",
      healthcare: "bg-teal-50 text-teal-700 border-teal-200",
      telecom: "bg-pink-50 text-pink-700 border-pink-200",
    }

    return colors[sector as keyof typeof colors] || "bg-blue-50 text-blue-700 border-blue-200"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Expected Annual Return */}
      <Card className="premium-card border-0 bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Expected Annual Return</CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800">{metrics.expectedReturn.toFixed(1)}%</div>
          <p className="text-xs text-slate-600 mt-1">
            {selectedSector && selectedSector !== "all"
              ? `${getSectorDisplayName(selectedSector)} sector projection`
              : "Portfolio-wide projection"}
          </p>
        </CardContent>
      </Card>

      {/* Portfolio Volatility */}
      <Card className="premium-card border-0 bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Portfolio Volatility</CardTitle>
          <BarChart3 className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800">{metrics.volatility.toFixed(1)}%</div>
          <p className="text-xs text-slate-600 mt-1">
            {selectedSector && selectedSector !== "all"
              ? `${getSectorDisplayName(selectedSector)} sector risk`
              : "Annual standard deviation"}
          </p>
        </CardContent>
      </Card>

      {/* Sharpe Ratio */}
      <Card className="premium-card border-0 bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Sharpe Ratio</CardTitle>
          <Target className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800">{metrics.sharpeRatio.toFixed(2)}</div>
          <p className="text-xs text-slate-600 mt-1">Risk-adjusted performance</p>
        </CardContent>
      </Card>

      {/* Value at Risk */}
      <Card className="premium-card border-0 bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Value at Risk (95%)</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800">
            ₹{varAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </div>
          <p className="text-xs text-slate-600 mt-1">{metrics.var95.toFixed(1)}% of portfolio value</p>
        </CardContent>
      </Card>

      {/* Max Drawdown */}
      <Card className="premium-card border-0 bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Max Drawdown</CardTitle>
          <Shield className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800">{metrics.maxDrawdown.toFixed(1)}%</div>
          <p className="text-xs text-slate-600 mt-1">Historical worst-case scenario</p>
        </CardContent>
      </Card>

      {/* Portfolio Insight */}
      <Card className="premium-card border-0 bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Portfolio Insight</CardTitle>
          <Lightbulb className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <Badge className={`${getInsightColor(selectedSector)} text-xs font-medium mb-2`}>
            {selectedSector && selectedSector !== "all"
              ? `${getSectorDisplayName(selectedSector)} Focus`
              : "Diversified Portfolio"}
          </Badge>
          <p className="text-xs text-slate-600 leading-relaxed">{metrics.insight}</p>
        </CardContent>
      </Card>
    </div>
  )
}
