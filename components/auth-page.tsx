"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Mail, Lock } from "lucide-react"

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: isLogin ? "You have been logged in successfully." : "Your account has been created successfully.",
      })
      router.push("/profile")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />

      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <Sparkles className="w-4 h-4 mr-2" />
              Get Started Today
            </Badge>
          </div>

          <Card className="premium-card border-0 shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
              <CardTitle className="text-2xl text-slate-800">
                {isLogin ? "Welcome Back" : "Create Your Account"}
              </CardTitle>
              <CardDescription className="text-slate-600 text-base">
                {isLogin ? "Sign in to access your portfolio dashboard" : "Join thousands of smart investors today"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-slate-800 font-semibold text-base">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      className="pl-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500 h-12 text-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-slate-800 font-semibold text-base">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-4 h-5 w-5 text-slate-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      className="pl-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500 h-12 text-slate-700"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <Separator className="my-6" />

              <Button
                variant="outline"
                className="w-full h-12 bg-white border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-slate-600 hover:text-blue-600 underline font-medium transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>

              {isLogin && (
                <div className="mt-4 text-center">
                  <Link href="#" className="text-slate-600 hover:text-blue-600 underline font-medium transition-colors">
                    Forgot your password?
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
