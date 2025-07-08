"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { calculatePortfolio, classifyInvestor } from "@/lib/portfolio-calculations"

interface StockTableProps {
  optimization: string
}

export function StockTable({ optimization }: StockTableProps) {
  const investmentAmount = 50000
  const horizon = 3
  const riskTolerance = 0.06 // 6%
  const objective = "3" // Balanced

  // Calculate portfolio using exact Python implementation
  const portfolioResult = calculatePortfolio(optimization as "sharpe" | "variance" | "hrp", investmentAmount, horizon)

  // Classify investor type
  const investorType = classifyInvestor(horizon, riskTolerance, objective)

  const totalInvested = portfolioResult.allocations.reduce((sum, alloc) => sum + alloc.amountUsed, 0)

  const getSectorColor = (sector: string) => {
    switch (sector) {
      case "Technology":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Financial":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "Energy":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Consumer":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Telecom":
        return "bg-pink-100 text-pink-800 border-pink-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Investor Classification Alert */}
      <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 premium-card border-0">
        <InfoIcon className="h-5 w-5 text-blue-600" />
        <AlertDescription className="text-blue-800 font-medium">
          <strong>Investor Profile:</strong> You are classified as a{" "}
          <strong className="text-blue-900">{investorType}</strong> based on your risk tolerance, investment horizon,
          and objectives.
        </AlertDescription>
      </Alert>

      {/* Uninvested Amount Alert */}
      {portfolioResult.remainingAmount > 0 && (
        <Alert className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 premium-card border-0">
          <InfoIcon className="h-5 w-5 text-orange-600" />
          <AlertDescription className="text-orange-800 font-medium">
            <strong>Uninvested Amount:</strong> ₹{portfolioResult.remainingAmount.toFixed(2)} remains uninvested after
            optimal allocation and reinvestment of remaining funds into cheapest available shares.
          </AlertDescription>
        </Alert>
      )}

      {/* Sector Exposure Alert */}
      <Alert className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 premium-card border-0">
        <InfoIcon className="h-5 w-5 text-emerald-600" />
        <AlertDescription className="text-emerald-800 font-medium">
          <strong>Sector Exposure:</strong>{" "}
          {Object.entries(portfolioResult.sectorExposure)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([sector, percentage]) => `${sector}: ${percentage.toFixed(1)}%`)
            .join(", ")}
        </AlertDescription>
      </Alert>

      <Card className="premium-card border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
          <CardTitle className="text-2xl text-slate-800">Portfolio Holdings</CardTitle>
          <CardDescription className="text-slate-600 text-lg">
            Detailed breakdown of your stock positions (Total Invested:{" "}
            <span className="font-semibold text-slate-800">₹{totalInvested.toLocaleString()}</span> of ₹
            {investmentAmount.toLocaleString()})
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className="text-slate-800 font-semibold">Ticker</TableHead>
                <TableHead className="text-slate-800 font-semibold">Sector</TableHead>
                <TableHead className="text-slate-800 font-semibold">Current Price (₹)</TableHead>
                <TableHead className="text-slate-800 font-semibold">Quantity</TableHead>
                <TableHead className="text-slate-800 font-semibold">Amount Used (₹)</TableHead>
                <TableHead className="text-slate-800 font-semibold">Target Allocation (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioResult.allocations
                .sort((a, b) => b.amountUsed - a.amountUsed)
                .map((allocation) => (
                  <TableRow key={allocation.ticker} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-semibold text-slate-800">{allocation.ticker}</TableCell>
                    <TableCell>
                      <Badge className={`${getSectorColor(allocation.sector)} font-medium border`}>
                        {allocation.sector}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-700 font-medium">
                      ₹{allocation.currentPrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-slate-700 font-medium">{allocation.quantity}</TableCell>
                    <TableCell className="text-slate-700 font-medium">
                      ₹{Math.round(allocation.amountUsed).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-slate-700 font-medium">
                      {(allocation.weight * 100).toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
