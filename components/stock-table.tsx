"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StockTableProps {
  optimization: string
  investmentAmount: number
  selectedSector?: string
}

export function StockTable({ optimization, investmentAmount, selectedSector }: StockTableProps) {
  const getStockData = (method: string, totalAmount: number) => {
    const allocations = {
      sharpe: [
        { symbol: "RELIANCE", allocation: 15.2, price: 2456.75, change: 2.3, sector: "energy" },
        { symbol: "TCS", allocation: 12.8, price: 3234.5, change: -1.2, sector: "technology" },
        { symbol: "HDFCBANK", allocation: 11.5, price: 1567.8, change: 1.8, sector: "financial" },
        { symbol: "INFY", allocation: 10.3, price: 1456.25, change: 0.9, sector: "technology" },
        { symbol: "ICICIBANK", allocation: 9.7, price: 987.6, change: -0.5, sector: "financial" },
        { symbol: "HINDUNILVR", allocation: 8.9, price: 2345.9, change: 1.4, sector: "consumer" },
        { symbol: "ITC", allocation: 7.6, price: 456.3, change: 0.7, sector: "consumer" },
        { symbol: "SBIN", allocation: 6.8, price: 567.45, change: -1.8, sector: "financial" },
        { symbol: "BHARTIARTL", allocation: 5.9, price: 876.2, change: 2.1, sector: "telecom" },
        { symbol: "KOTAKBANK", allocation: 4.2, price: 1789.35, change: 0.3, sector: "financial" },
        { symbol: "ASIANPAINT", allocation: 3.8, price: 3456.8, change: -0.8, sector: "consumer" },
        { symbol: "MARUTI", allocation: 3.5, price: 9876.45, change: 1.6, sector: "consumer" },
        { symbol: "DRREDDY", allocation: 3.2, price: 5432.1, change: 0.5, sector: "healthcare" },
        { symbol: "SUNPHARMA", allocation: 2.8, price: 987.65, change: -0.3, sector: "healthcare" },
      ],
      variance: [
        { symbol: "HINDUNILVR", allocation: 18.5, price: 2345.9, change: 1.4, sector: "consumer" },
        { symbol: "ITC", allocation: 16.2, price: 456.3, change: 0.7, sector: "consumer" },
        { symbol: "HDFCBANK", allocation: 14.8, price: 1567.8, change: 1.8, sector: "financial" },
        { symbol: "TCS", allocation: 12.1, price: 3234.5, change: -1.2, sector: "technology" },
        { symbol: "ICICIBANK", allocation: 10.7, price: 987.6, change: -0.5, sector: "financial" },
        { symbol: "RELIANCE", allocation: 9.3, price: 2456.75, change: 2.3, sector: "energy" },
        { symbol: "INFY", allocation: 7.8, price: 1456.25, change: 0.9, sector: "technology" },
        { symbol: "SBIN", allocation: 5.2, price: 567.45, change: -1.8, sector: "financial" },
        { symbol: "BHARTIARTL", allocation: 3.1, price: 876.2, change: 2.1, sector: "telecom" },
        { symbol: "KOTAKBANK", allocation: 2.3, price: 1789.35, change: 0.3, sector: "financial" },
        { symbol: "DRREDDY", allocation: 2.1, price: 5432.1, change: 0.5, sector: "healthcare" },
        { symbol: "SUNPHARMA", allocation: 1.9, price: 987.65, change: -0.3, sector: "healthcare" },
      ],
      hrp: [
        { symbol: "TCS", allocation: 14.7, price: 3234.5, change: -1.2, sector: "technology" },
        { symbol: "RELIANCE", allocation: 13.2, price: 2456.75, change: 2.3, sector: "energy" },
        { symbol: "HDFCBANK", allocation: 12.9, price: 1567.8, change: 1.8, sector: "financial" },
        { symbol: "HINDUNILVR", allocation: 11.4, price: 2345.9, change: 1.4, sector: "consumer" },
        { symbol: "INFY", allocation: 10.8, price: 1456.25, change: 0.9, sector: "technology" },
        { symbol: "ICICIBANK", allocation: 9.6, price: 987.6, change: -0.5, sector: "financial" },
        { symbol: "ITC", allocation: 8.3, price: 456.3, change: 0.7, sector: "consumer" },
        { symbol: "SBIN", allocation: 7.1, price: 567.45, change: -1.8, sector: "financial" },
        { symbol: "BHARTIARTL", allocation: 6.5, price: 876.2, change: 2.1, sector: "telecom" },
        { symbol: "KOTAKBANK", allocation: 5.5, price: 1789.35, change: 0.3, sector: "financial" },
        { symbol: "DRREDDY", allocation: 4.2, price: 5432.1, change: 0.5, sector: "healthcare" },
        { symbol: "SUNPHARMA", allocation: 3.8, price: 987.65, change: -0.3, sector: "healthcare" },
      ],
    }

    let stocks = allocations[method as keyof typeof allocations] || allocations.sharpe

    // Filter by selected sector if specified
    if (selectedSector && selectedSector !== "all") {
      stocks = stocks.filter((stock) => stock.sector === selectedSector)

      // Recalculate allocations to sum to 100% for the filtered sector
      const totalFilteredAllocation = stocks.reduce((sum, stock) => sum + stock.allocation, 0)
      if (totalFilteredAllocation > 0) {
        stocks = stocks.map((stock) => ({
          ...stock,
          allocation: (stock.allocation / totalFilteredAllocation) * 100,
        }))
      }
    }

    return stocks.map((stock) => {
      const amount = (totalAmount * stock.allocation) / 100
      const quantity = Math.floor(amount / stock.price)
      const actualAmount = quantity * stock.price

      return {
        ...stock,
        quantity,
        amount: actualAmount,
      }
    })
  }

  const stockData = getStockData(optimization, investmentAmount)
  const totalInvested = stockData.reduce((sum, stock) => sum + stock.amount, 0)
  const uninvestedAmount = investmentAmount - totalInvested

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

  return (
    <Card className="premium-card border-0 bg-white/80 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-slate-800 flex items-center gap-2">
          Portfolio Holdings
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
            {stockData.length} stocks
          </Badge>
          {selectedSector && selectedSector !== "all" && (
            <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50">
              {getSectorDisplayName(selectedSector)} Sector
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-slate-600">
          {selectedSector && selectedSector !== "all"
            ? `${getSectorDisplayName(selectedSector)} sector holdings breakdown`
            : "Detailed breakdown of your stock positions"}{" "}
          (Total Invested: ₹{totalInvested.toLocaleString("en-IN", { maximumFractionDigits: 0 })} of ₹
          {investmentAmount.toLocaleString("en-IN")})
          {uninvestedAmount > 0 && (
            <span className="block mt-1 text-amber-600 font-medium">
              Uninvested Amount: ₹{uninvestedAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {stockData.length === 0 ? (
          <div className="text-center py-8 text-slate-500">No stocks found for the selected sector</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-700 font-semibold">Stock</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Sector</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Allocation</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Current Price</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Quantity</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Amount Used</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stockData.map((stock, index) => (
                  <TableRow key={index} className="border-slate-100 hover:bg-slate-50/50">
                    <TableCell className="font-medium text-slate-800">{stock.symbol}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
                        {getSectorDisplayName(stock.sector)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-blue-200 text-blue-700">
                        {stock.allocation.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-700">
                      ₹{stock.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-slate-700">{stock.quantity}</TableCell>
                    <TableCell className="font-medium text-slate-800">
                      ₹{stock.amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`flex items-center gap-1 ${stock.change >= 0 ? "text-emerald-600" : "text-red-600"}`}
                      >
                        {stock.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        <span className="text-sm font-medium">
                          {stock.change >= 0 ? "+" : ""}
                          {stock.change.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
