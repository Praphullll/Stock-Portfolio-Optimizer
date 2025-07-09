"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  BarChart3,
  Shield,
  TrendingUp,
  Zap,
  Target,
  PieChart,
  Star,
  Users,
  Award,
  CheckCircle,
  Sparkles,
  DollarSign,
  Globe,
} from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 float-animation"></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 float-animation"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="text-center max-w-5xl mx-auto relative z-20">
          <Badge
            variant="secondary"
            className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-4 py-2 text-sm font-semibold"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Portfolio Optimization
          </Badge>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            <span className="gradient-text">Create Your Perfect</span>
            <br />
            <span className="text-slate-800">Portfolio</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Leverage advanced optimization algorithms including Minimum Variance, Sharpe Ratio, and HRP to build your
            <span className="text-blue-600 font-semibold"> data-driven investment strategy</span> in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative z-30 border-0"
              asChild
            >
              <Link href="/auth" className="inline-flex items-center">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-semibold bg-transparent"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              View Live Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-white/50 backdrop-blur-sm">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
            <Award className="w-4 h-4 mr-2" />
            Premium Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
            Three Proven <span className="gradient-text">Optimization Strategies</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose from scientifically-backed portfolio optimization methods tailored to your investment goals and risk
            appetite
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="premium-card text-center border-0 p-8">
            <CardHeader className="pb-6">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800 mb-3">Minimum Variance</CardTitle>
              <CardDescription className="text-slate-600 text-lg">
                Minimize portfolio risk while maintaining expected returns for conservative investors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-left">
                <div className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span>Lowest possible volatility</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span>Perfect for risk-averse investors</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span>Stable, predictable returns</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-700 font-semibold">Expected Volatility</div>
                <div className="text-2xl font-bold text-blue-800">5.1%</div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card text-center border-0 p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                <Star className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
            </div>
            <CardHeader className="pb-6">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center pulse-glow">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800 mb-3">Sharpe Ratio</CardTitle>
              <CardDescription className="text-slate-600 text-lg">
                Maximize risk-adjusted returns for optimal performance and balanced growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-left">
                <div className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span>Best risk-return balance</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span>Moderate risk tolerance</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span>Efficient frontier optimization</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                <div className="text-sm text-emerald-700 font-semibold">Expected Return</div>
                <div className="text-2xl font-bold text-emerald-800">12.5%</div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card text-center border-0 p-8">
            <CardHeader className="pb-6">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <PieChart className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800 mb-3">HRP (Hierarchical)</CardTitle>
              <CardDescription className="text-slate-600 text-lg">
                Advanced machine learning clustering-based diversification strategy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-left">
                <div className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span>AI-powered approach</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span>Superior diversification</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span>Robust to market changes</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <div className="text-sm text-purple-700 font-semibold">Sharpe Ratio</div>
                <div className="text-2xl font-bold text-purple-800">1.65</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-800">Lightning Fast</h3>
            <p className="text-slate-600">Get optimized portfolios in under 30 seconds</p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-800">Data-Driven</h3>
            <p className="text-slate-600">Based on real-time market data and analytics</p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-800">Personalized</h3>
            <p className="text-slate-600">Tailored to your risk profile and goals</p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-800">Risk Managed</h3>
            <p className="text-slate-600">Advanced risk metrics and controls</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
              <Globe className="w-4 h-4 mr-2" />
              Trusted Globally
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Why <span className="gradient-text">to Choose Us</span>
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Our platform combines cutting-edge technology with proven investment strategies to deliver exceptional
              results.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 mb-2">No Hidden Fees</h3>
                  <p className="text-slate-600">Transparent pricing with no management fees or hidden charges</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 mb-2">Expert Support</h3>
                  <p className="text-slate-600">
                    24/7 support from certified financial advisors and portfolio managers
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 mb-2">Award Winning</h3>
                  <p className="text-slate-600">Recognized as "Best Portfolio Optimizer 2024" by FinTech Awards</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform rotate-6 opacity-20"></div>
            <Card className="premium-card p-8 relative z-10 border-0">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-slate-800 mb-2">Portfolio Performance</div>
                <div className="text-slate-600">Last 12 months average</div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-lg">
                  <span className="font-semibold text-slate-700">Total Returns</span>
                  <span className="text-2xl font-bold text-emerald-600">+15.2%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-slate-700">Sharpe Ratio</span>
                  <span className="text-2xl font-bold text-blue-600">1.84</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="font-semibold text-slate-700">Max Drawdown</span>
                  <span className="text-2xl font-bold text-purple-600">-3.2%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white border-0 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-500 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <CardContent className="p-16 text-center relative z-20">
            <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Start Your Journey
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Optimize Your Portfolio?</h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Join thousands of smart investors who trust our AI-powered optimization to grow their wealth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative z-30 border-0"
                asChild
              >
                <Link href="/auth" className="inline-flex items-center">
                  Start Building Your Portfolio <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold bg-transparent"
              >
                Schedule a Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
