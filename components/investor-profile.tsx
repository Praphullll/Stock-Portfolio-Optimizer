"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"
import { ArrowRight, User, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function InvestorProfile() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile saved!",
        description: "Your investor profile has been saved successfully.",
      })
      router.push("/portfolio-builder")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <Sparkles className="w-4 h-4 mr-2" />
              Step 1 of 3
            </Badge>
            <h1 className="text-4xl font-bold mb-4 text-slate-800">Create Your Investor Profile</h1>
            <p className="text-xl text-slate-600">
              Help us understand your investment preferences to create a personalized portfolio strategy
            </p>
          </div>

          <Card className="premium-card border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
              <CardTitle className="text-2xl text-slate-800">Personal Information</CardTitle>
              <CardDescription className="text-slate-600 text-lg">
                This information helps us tailor your investment strategy to your unique needs
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-slate-800 font-semibold text-base">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      required
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 h-12 text-slate-700"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="age" className="text-slate-800 font-semibold text-base">
                      Age (Optional)
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      min="18"
                      max="100"
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 h-12 text-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="experience" className="text-slate-800 font-semibold text-base">
                    Investment Experience
                  </Label>
                  <Select required>
                    <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 h-12">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="sectors" className="text-slate-800 font-semibold text-base">
                    Sector Preferences (Optional)
                  </Label>
                  <Select>
                    <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 h-12">
                      <SelectValue placeholder="Select preferred sectors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="consumer">Consumer Goods</SelectItem>
                      <SelectItem value="energy">Energy</SelectItem>
                      <SelectItem value="diversified">Diversified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <Checkbox id="esg" className="border-emerald-400 data-[state=checked]:bg-emerald-600" />
                  <Label htmlFor="esg" className="text-slate-800 font-medium">
                    I want my portfolio to be ESG (Environmental, Social, Governance) compliant
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving Profile..." : "Save Profile & Continue"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
