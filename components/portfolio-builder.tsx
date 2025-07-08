"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"
import { Calculator, IndianRupee, Target, TrendingUp, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function PortfolioBuilder() {
  const [amount, setAmount] = useState("")
  const [riskTolerance, setRiskTolerance] = useState([5])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const investmentAmount = Number.parseFloat(amount)
    if (investmentAmount < 1000) {
      toast({
        title: "Invalid Amount",
        description: "Minimum investment amount is ₹1,000",
        variant: "destructive",
      })
      return
    }

    if (riskTolerance[0] > 10) {
      toast({
        title: "Invalid Risk Level",
        description: "Risk tolerance cannot exceed 10%",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate portfolio creation
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Portfolio Created!",
        description: "Your optimized portfolio has been generated successfully.",
      })
      router.push("/dashboard")
    }, 2000)
  }

  const getRiskColor = (risk: number) => {
    if (risk <= 3) return "text-emerald-600"
    if (risk <= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getRiskLabel = (risk: number) => {
    if (risk <= 3) return "Conservative"
    if (risk <= 6) return "Moderate"
    return "Aggressive"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl flex items-center justify-center">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <Badge className="mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0">
              <Sparkles className="w-4 h-4 mr-2" />
              Step 2 of 3
            </Badge>
            <h1 className="text-4xl font-bold mb-4 text-slate-800">Build Your Portfolio</h1>
            <p className="text-xl text-slate-600">
              Configure your investment parameters to generate an AI-optimized portfolio
            </p>
          </div>

          <Card className="premium-card border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-emerald-50 rounded-t-lg">
              <CardTitle className="text-2xl text-slate-800">Investment Parameters</CardTitle>
              <CardDescription className="text-slate-600 text-lg">
                Set your investment amount, risk tolerance, and financial objectives
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-slate-800 font-semibold text-base">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    defaultValue="John Doe"
                    required
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 h-12 text-slate-700"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="amount" className="text-slate-800 font-semibold text-base">
                    Investment Amount (INR)
                  </Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-4 h-5 w-5 text-slate-500" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="50,000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-12 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 h-14 text-slate-700 text-lg"
                      min="1000"
                      required
                    />
                  </div>
                  <p className="text-sm text-slate-500 bg-blue-50 p-3 rounded-lg border border-blue-200">
                    💡 Minimum investment: ₹1,000 • Recommended: ₹50,000 or more for better diversification
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <Label className="text-slate-800 font-semibold text-base">Risk Tolerance</Label>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getRiskColor(riskTolerance[0])}`}>{riskTolerance[0]}%</div>
                      <div className={`text-sm font-medium ${getRiskColor(riskTolerance[0])}`}>
                        {getRiskLabel(riskTolerance[0])}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
                    <Slider
                      value={riskTolerance}
                      onValueChange={setRiskTolerance}
                      max={10}
                      min={0}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-slate-600 mt-4">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                        Conservative (0%)
                      </span>
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        Aggressive (10%)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="objective" className="text-slate-800 font-semibold text-base">
                    Investment Objective
                  </Label>
                  <Select required>
                    <SelectTrigger className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 h-12">
                      <SelectValue placeholder="Select your investment objective" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="growth">
                        <div className="flex items-center py-2">
                          <TrendingUp className="h-5 w-5 mr-3 text-emerald-600" />
                          <div>
                            <div className="font-semibold">Growth</div>
                            <div className="text-sm text-slate-600">Focus on capital appreciation</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="income">
                        <div className="flex items-center py-2">
                          <IndianRupee className="h-5 w-5 mr-3 text-blue-600" />
                          <div>
                            <div className="font-semibold">Income</div>
                            <div className="text-sm text-slate-600">Focus on dividend yield</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="balanced">
                        <div className="flex items-center py-2">
                          <Target className="h-5 w-5 mr-3 text-purple-600" />
                          <div>
                            <div className="font-semibold">Balanced</div>
                            <div className="text-sm text-slate-600">Mix of growth and income</div>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="holding-period" className="text-slate-800 font-semibold text-base">
                    Holding Period
                  </Label>
                  <Select required>
                    <SelectTrigger className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 h-12">
                      <SelectValue placeholder="Select holding period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Year</SelectItem>
                      <SelectItem value="2">2 Years</SelectItem>
                      <SelectItem value="3">3 Years (Recommended)</SelectItem>
                      <SelectItem value="4">4 Years</SelectItem>
                      <SelectItem value="5">5+ Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Your Portfolio..." : "Create Optimized Portfolio"}
                  <Calculator className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
