"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface PortfolioChartProps {
  optimization: string
}

export function PortfolioChart({ optimization }: PortfolioChartProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getPortfolioData = (method: string) => {
    switch (method) {
      case "sharpe":
        return [
          { name: "RELIANCE", value: 15.2 },
          { name: "TCS", value: 12.8 },
          { name: "HDFCBANK", value: 11.5 },
          { name: "INFY", value: 10.3 },
          { name: "ICICIBANK", value: 9.7 },
          { name: "HINDUNILVR", value: 8.9 },
          { name: "ITC", value: 7.6 },
          { name: "SBIN", value: 6.8 },
          { name: "BHARTIARTL", value: 5.9 },
          { name: "Others", value: 11.3 },
        ]
      case "variance":
        return [
          { name: "HINDUNILVR", value: 18.5 },
          { name: "ITC", value: 16.2 },
          { name: "HDFCBANK", value: 14.8 },
          { name: "TCS", value: 12.1 },
          { name: "ICICIBANK", value: 10.7 },
          { name: "RELIANCE", value: 9.3 },
          { name: "INFY", value: 7.8 },
          { name: "SBIN", value: 5.2 },
          { name: "BHARTIARTL", value: 3.1 },
          { name: "Others", value: 2.3 },
        ]
      case "hrp":
        return [
          { name: "TCS", value: 14.7 },
          { name: "RELIANCE", value: 13.2 },
          { name: "HDFCBANK", value: 12.9 },
          { name: "HINDUNILVR", value: 11.4 },
          { name: "INFY", value: 10.8 },
          { name: "ICICIBANK", value: 9.6 },
          { name: "ITC", value: 8.3 },
          { name: "SBIN", value: 7.1 },
          { name: "BHARTIARTL", value: 6.5 },
          { name: "Others", value: 5.5 },
        ]
      default:
        return []
    }
  }

  const data = getPortfolioData(optimization)

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#FFC658",
    "#FF7C7C",
    "#8DD1E1",
    "#D084D0",
  ]

  if (!isClient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Allocation</CardTitle>
          <CardDescription>Asset allocation based on {optimization.toUpperCase()} optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Allocation</CardTitle>
        <CardDescription>Asset allocation based on {optimization.toUpperCase()} optimization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px] bg-gray-50 rounded-lg p-4">
          <svg width="100%" height="100%" viewBox="0 0 400 300">
            {/* Simple pie chart using SVG */}
            {data.map((item, index) => {
              const total = data.reduce((sum, d) => sum + d.value, 0)
              const percentage = (item.value / total) * 100
              const angle = (item.value / total) * 360

              // Calculate position for each slice
              let currentAngle = 0
              for (let i = 0; i < index; i++) {
                currentAngle += (data[i].value / total) * 360
              }

              const startAngle = (currentAngle * Math.PI) / 180
              const endAngle = ((currentAngle + angle) * Math.PI) / 180
              const centerX = 150
              const centerY = 150
              const radius = 80

              const x1 = centerX + radius * Math.cos(startAngle)
              const y1 = centerY + radius * Math.sin(startAngle)
              const x2 = centerX + radius * Math.cos(endAngle)
              const y2 = centerY + radius * Math.sin(endAngle)

              const largeArcFlag = angle > 180 ? 1 : 0

              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                "Z",
              ].join(" ")

              return (
                <g key={index}>
                  <path d={pathData} fill={COLORS[index % COLORS.length]} stroke="white" strokeWidth="2" />
                  {/* Label */}
                  <text x={320} y={20 + index * 20} fontSize="12" fill="#333">
                    <tspan fill={COLORS[index % COLORS.length]}>●</tspan> {item.name}: {item.value}%
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}
