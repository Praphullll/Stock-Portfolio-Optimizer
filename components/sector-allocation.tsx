"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface SectorAllocationProps {
  optimization: string
}

export function SectorAllocation({ optimization }: SectorAllocationProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getSectorData = (method: string) => {
    switch (method) {
      case "sharpe":
        return [
          { sector: "Technology", allocation: 28.5 },
          { sector: "Financial", allocation: 24.2 },
          { sector: "Energy", allocation: 18.7 },
          { sector: "Consumer", allocation: 15.3 },
          { sector: "Healthcare", allocation: 8.9 },
          { sector: "Telecom", allocation: 4.4 },
        ]
      case "variance":
        return [
          { sector: "Consumer", allocation: 32.1 },
          { sector: "Financial", allocation: 26.8 },
          { sector: "Technology", allocation: 19.4 },
          { sector: "Healthcare", allocation: 12.7 },
          { sector: "Energy", allocation: 6.2 },
          { sector: "Telecom", allocation: 2.8 },
        ]
      case "hrp":
        return [
          { sector: "Technology", allocation: 25.6 },
          { sector: "Financial", allocation: 23.9 },
          { sector: "Consumer", allocation: 20.1 },
          { sector: "Energy", allocation: 15.8 },
          { sector: "Healthcare", allocation: 9.3 },
          { sector: "Telecom", allocation: 5.3 },
        ]
      default:
        return []
    }
  }

  const data = getSectorData(optimization)

  if (!isClient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sector Exposure</CardTitle>
          <CardDescription>Diversification across different sectors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const maxValue = Math.max(...data.map((d) => d.allocation))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sector Exposure</CardTitle>
        <CardDescription>Diversification across different sectors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px] bg-gray-50 rounded-lg p-4">
          <svg width="100%" height="100%" viewBox="0 0 500 300">
            {/* Y-axis */}
            <line x1="50" y1="20" x2="50" y2="250" stroke="#ccc" strokeWidth="1" />
            {/* X-axis */}
            <line x1="50" y1="250" x2="450" y2="250" stroke="#ccc" strokeWidth="1" />

            {/* Y-axis labels */}
            {[0, 10, 20, 30, 40].map((value, index) => (
              <g key={index}>
                <line x1="45" y1={250 - (value / 40) * 230} x2="50" y2={250 - (value / 40) * 230} stroke="#ccc" />
                <text x="40" y={250 - (value / 40) * 230 + 5} fontSize="10" textAnchor="end" fill="#666">
                  {value}%
                </text>
              </g>
            ))}

            {/* Bars */}
            {data.map((item, index) => {
              const barWidth = 50
              const barHeight = (item.allocation / maxValue) * 200
              const x = 70 + index * 60
              const y = 250 - barHeight

              return (
                <g key={index}>
                  <rect x={x} y={y} width={barWidth} height={barHeight} fill="#3b82f6" rx="4" />
                  <text x={x + barWidth / 2} y={y - 5} fontSize="10" textAnchor="middle" fill="#333">
                    {item.allocation}%
                  </text>
                  <text
                    x={x + barWidth / 2}
                    y={270}
                    fontSize="10"
                    textAnchor="middle"
                    fill="#666"
                    transform={`rotate(-45, ${x + barWidth / 2}, 270)`}
                  >
                    {item.sector}
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
