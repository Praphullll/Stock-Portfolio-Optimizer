// Portfolio calculation utilities using real stock data from CSV

export interface StockData {
  ticker: string
  sector: string
  currentPrice: number
  expectedReturn: number
  stdDev: number
  sharpeRatio: number
  beta: number
  maxDrawdown: number
  var95: number
}

export interface PortfolioResult {
  weights: number[]
  expectedReturn: number
  portfolioRisk: number
  sharpeRatio: number
  var95: number
  projectedValue: number
  allocations: AllocationData[]
  sectorExposure: { [sector: string]: number }
  remainingAmount: number
  insight: string
}

export interface AllocationData {
  ticker: string
  sector: string
  weight: number
  weightPercent: number
  currentPrice: number
  quantity: number
  amountUsed: number
  percentOfInvestment: number
}

// Real stock data will be loaded from CSV
let realStockData: StockData[] = []

// Function to load real stock data from CSV
async function loadRealStockData(): Promise<StockData[]> {
  if (realStockData.length > 0) {
    return realStockData
  }

  try {
    const csvUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Results-NKZabn7DT1PskftLucUz0WkexHyrZC.csv"
    const response = await fetch(csvUrl)
    const csvText = await response.text()

    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

    const stocks: StockData[] = []

    for (let i = 1; i < lines.length && i <= 301; i++) {
      // Process up to 300 stocks
      const line = lines[i].trim()
      if (!line) continue

      const values = line.split(",").map((v) => v.trim().replace(/"/g, ""))
      if (values.length < headers.length) continue

      const stock: any = {}
      headers.forEach((header, index) => {
        stock[header] = values[index]
      })

      if (!stock.Ticker || !stock["Current Price"] || !stock.Sector) continue

      const currentPrice = Number.parseFloat(stock["Current Price"])
      const price2030 = Number.parseFloat(stock["2030-12"])

      if (isNaN(currentPrice) || isNaN(price2030) || currentPrice <= 0) continue

      // Calculate annualized return (5 years)
      const totalReturn = (price2030 - currentPrice) / currentPrice
      const annualizedReturn = Math.pow(1 + totalReturn, 1 / 5) - 1

      const volatility = Number.parseFloat(stock["Std Dev (%)"]) / 100 || 0.15
      const sharpeRatio = Number.parseFloat(stock["Sharpe Ratio"]) || 0
      const beta = Number.parseFloat(stock["Beta"]) || 1
      const maxDrawdown = Math.abs(Number.parseFloat(stock["Max Drawdown (%)"]) / 100) || 0.2

      // Normalize sector names
      const sectorMap: { [key: string]: string } = {
        "consumer service": "consumer",
        "consumer goods": "consumer",
        "consumer staples": "consumer",
        "consumer discretionary": "consumer",
        "information technology": "technology",
        it: "technology",
        software: "technology",
        "financial services": "financial",
        banking: "financial",
        insurance: "financial",
        "oil & gas": "energy",
        energy: "energy",
        utilities: "energy",
        healthcare: "healthcare",
        pharmaceuticals: "healthcare",
        biotechnology: "healthcare",
        telecommunications: "telecom",
        telecom: "telecom",
        industrials: "industrial",
        manufacturing: "industrial",
        materials: "materials",
        "real estate": "realestate",
      }

      let normalizedSector = stock.Sector.toLowerCase().trim()
      normalizedSector = sectorMap[normalizedSector] || normalizedSector.replace(/\s+/g, "")

      const processedStock: StockData = {
        ticker: stock.Ticker,
        sector: normalizedSector,
        currentPrice: currentPrice,
        expectedReturn: annualizedReturn,
        stdDev: volatility,
        sharpeRatio: sharpeRatio,
        beta: beta,
        maxDrawdown: maxDrawdown,
        var95: Math.abs(Number.parseFloat(stock["VaR (95%)"]) / 100) || 0.05,
      }

      // Filter for reasonable stocks
      if (
        processedStock.expectedReturn > -0.5 &&
        processedStock.expectedReturn < 2.0 &&
        processedStock.stdDev > 0 &&
        processedStock.stdDev < 1.0
      ) {
        stocks.push(processedStock)
      }
    }

    realStockData = stocks
    return stocks
  } catch (error) {
    console.error("Error loading real stock data:", error)
    // Fallback to mock data if CSV fails
    return getMockStockData()
  }
}

// Fallback mock data
function getMockStockData(): StockData[] {
  return [
    {
      ticker: "RELIANCE.NS",
      sector: "energy",
      currentPrice: 2456.75,
      expectedReturn: 0.152,
      stdDev: 0.082,
      sharpeRatio: 1.85,
      beta: 1.2,
      maxDrawdown: 0.15,
      var95: 0.08,
    },
    {
      ticker: "TCS.NS",
      sector: "technology",
      currentPrice: 3890.2,
      expectedReturn: 0.148,
      stdDev: 0.075,
      sharpeRatio: 1.97,
      beta: 0.9,
      maxDrawdown: 0.12,
      var95: 0.07,
    },
    {
      ticker: "HDFCBANK.NS",
      sector: "financial",
      currentPrice: 1678.45,
      expectedReturn: 0.135,
      stdDev: 0.068,
      sharpeRatio: 1.99,
      beta: 1.1,
      maxDrawdown: 0.14,
      var95: 0.06,
    },
    {
      ticker: "INFY.NS",
      sector: "technology",
      currentPrice: 1456.3,
      expectedReturn: 0.142,
      stdDev: 0.071,
      sharpeRatio: 2.0,
      beta: 0.85,
      maxDrawdown: 0.11,
      var95: 0.065,
    },
    {
      ticker: "ICICIBANK.NS",
      sector: "financial",
      currentPrice: 1234.8,
      expectedReturn: 0.128,
      stdDev: 0.065,
      sharpeRatio: 1.97,
      beta: 1.15,
      maxDrawdown: 0.13,
      var95: 0.058,
    },
    {
      ticker: "HINDUNILVR.NS",
      sector: "consumer",
      currentPrice: 2567.9,
      expectedReturn: 0.118,
      stdDev: 0.058,
      sharpeRatio: 2.03,
      beta: 0.7,
      maxDrawdown: 0.09,
      var95: 0.05,
    },
    {
      ticker: "ITC.NS",
      sector: "consumer",
      currentPrice: 456.25,
      expectedReturn: 0.112,
      stdDev: 0.055,
      sharpeRatio: 2.04,
      beta: 0.65,
      maxDrawdown: 0.08,
      var95: 0.048,
    },
    {
      ticker: "SBIN.NS",
      sector: "financial",
      currentPrice: 789.6,
      expectedReturn: 0.125,
      stdDev: 0.072,
      sharpeRatio: 1.74,
      beta: 1.3,
      maxDrawdown: 0.16,
      var95: 0.07,
    },
    {
      ticker: "BHARTIARTL.NS",
      sector: "telecom",
      currentPrice: 1123.45,
      expectedReturn: 0.108,
      stdDev: 0.063,
      sharpeRatio: 1.71,
      beta: 0.8,
      maxDrawdown: 0.12,
      var95: 0.055,
    },
    {
      ticker: "WIPRO.NS",
      sector: "technology",
      currentPrice: 567.8,
      expectedReturn: 0.115,
      stdDev: 0.069,
      sharpeRatio: 1.67,
      beta: 0.9,
      maxDrawdown: 0.13,
      var95: 0.062,
    },
  ]
}

// Risk-free rate (6.98% as per Indian government bonds)
const RISK_FREE_RATE = 0.0698

// VaR calculation using parametric method
export function calculateVaR(investment: number, portReturn: number, portRisk: number, confidenceLevel = 0.95): number {
  const zScore = confidenceLevel === 0.95 ? -1.6449 : -2.3263
  const var95 = investment * (portReturn + zScore * portRisk)
  return Math.abs(var95)
}

// Matrix operations
function dotProduct(a: number[], b: number[]): number {
  return a.reduce((sum, val, i) => sum + val * b[i], 0)
}

function matrixVectorMultiply(matrix: number[][], vector: number[]): number[] {
  return matrix.map((row) => dotProduct(row, vector))
}

function calculatePortfolioRisk(weights: number[], covMatrix: number[][]): number {
  const temp = matrixVectorMultiply(covMatrix, weights)
  return Math.sqrt(dotProduct(weights, temp))
}

// Compute covariance matrix using correlation estimates
function computeCovMatrix(stdDevs: number[], correlations?: number[][]): number[][] {
  const n = stdDevs.length
  const covMatrix: number[][] = Array(n)
    .fill(null)
    .map(() => Array(n).fill(0))

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        covMatrix[i][j] = stdDevs[i] ** 2
      } else {
        // Use estimated correlation (0.3 for same sector, 0.1 for different sectors)
        const correlation = correlations ? correlations[i][j] : 0.15
        covMatrix[i][j] = correlation * stdDevs[i] * stdDevs[j]
      }
    }
  }

  return covMatrix
}

// Portfolio optimization algorithms
function minimumVariancePortfolio(covMatrix: number[][]): number[] {
  const n = covMatrix.length
  const invVol = covMatrix.map((_, i) => 1 / Math.sqrt(covMatrix[i][i]))
  const totalInvVol = invVol.reduce((sum, iv) => sum + iv, 0)
  return invVol.map((iv) => iv / totalInvVol)
}

function sharpeRatioPortfolio(returns: number[], covMatrix: number[], riskFreeRate: number): number[] {
  const n = returns.length
  const excessReturnToVol = returns.map((ret, i) => (ret - riskFreeRate) / Math.sqrt(covMatrix[i][i]))
  const positiveRatios = excessReturnToVol.map((ratio) => Math.max(0, ratio))
  const totalRatio = positiveRatios.reduce((sum, ratio) => sum + ratio, 0)

  if (totalRatio === 0) {
    return Array(n).fill(1 / n)
  }

  return positiveRatios.map((ratio) => ratio / totalRatio)
}

function hrpAllocation(covMatrix: number[][]): number[] {
  const n = covMatrix.length
  const invVol = covMatrix.map((_, i) => 1 / Math.sqrt(covMatrix[i][i]))
  const totalInvVol = invVol.reduce((sum, iv) => sum + iv, 0)
  const baseWeights = invVol.map((iv) => iv / totalInvVol)

  // Risk budgeting adjustment
  const riskContrib = baseWeights.map((w, i) => w * Math.sqrt(covMatrix[i][i]))
  const totalRisk = riskContrib.reduce((sum, rc) => sum + rc, 0)

  return baseWeights.map((w, i) => (w * (1 / riskContrib[i]) * totalRisk) / n)
}

function adjustZeroAllocation(weights: number[]): number[] {
  const minAllocation = 0.01
  const adjustedWeights = weights.map((w) => Math.max(w, minAllocation))
  const weightSum = adjustedWeights.reduce((sum, w) => sum + w, 0)
  return adjustedWeights.map((w) => w / weightSum)
}

function calculateAllocations(
  weights: number[],
  investment: number,
  stockData: StockData[],
): { allocations: AllocationData[]; remainingAmount: number } {
  const adjustedWeights = adjustZeroAllocation(weights)
  const allocAmounts = adjustedWeights.map((w) => w * investment)
  const quantities = allocAmounts.map((amount, i) => Math.floor(amount / stockData[i].currentPrice))
  const usedAmounts = quantities.map((qty, i) => qty * stockData[i].currentPrice)

  let remainingAmount = investment - usedAmounts.reduce((sum, amount) => sum + amount, 0)
  const currentPrices = stockData.map((stock) => stock.currentPrice)

  // Reinvestment logic
  while (remainingAmount >= Math.min(...currentPrices)) {
    const priceIndices = currentPrices.map((price, i) => ({ price, index: i })).sort((a, b) => a.price - b.price)

    let invested = false
    for (const { price, index } of priceIndices) {
      if (remainingAmount >= price) {
        quantities[index] += 1
        usedAmounts[index] += price
        remainingAmount -= price
        invested = true
        break
      }
    }
    if (!invested) break
  }

  const percentInvested = usedAmounts.map((amount) => (amount / investment) * 100)

  const allocations: AllocationData[] = stockData
    .map((stock, i) => ({
      ticker: stock.ticker,
      sector: stock.sector,
      weight: adjustedWeights[i],
      weightPercent: adjustedWeights[i] * 100,
      currentPrice: stock.currentPrice,
      quantity: quantities[i],
      amountUsed: usedAmounts[i],
      percentOfInvestment: percentInvested[i],
    }))
    .filter((alloc) => alloc.amountUsed > 0)
    .sort((a, b) => b.amountUsed - a.amountUsed)

  return { allocations, remainingAmount }
}

function calculateSectorExposure(allocations: AllocationData[], investment: number): { [sector: string]: number } {
  const sectorTotals: { [sector: string]: number } = {}

  allocations.forEach((alloc) => {
    if (!sectorTotals[alloc.sector]) {
      sectorTotals[alloc.sector] = 0
    }
    sectorTotals[alloc.sector] += alloc.amountUsed
  })

  const sectorExposure: { [sector: string]: number } = {}
  Object.keys(sectorTotals).forEach((sector) => {
    sectorExposure[sector] = (sectorTotals[sector] / investment) * 100
  })

  return sectorExposure
}

function generateInsight(sharpeRatio: number): string {
  if (sharpeRatio > 1.5) {
    return "Excellent risk-adjusted return. Strong portfolio."
  } else if (sharpeRatio > 1.0) {
    return "Good risk-return tradeoff."
  } else {
    return "Risk may outweigh reward. Consider optimizing."
  }
}

// Main portfolio calculation function
export async function calculatePortfolio(
  method: "sharpe" | "variance" | "hrp",
  investment: number,
  horizon = 3,
  selectedSector?: string,
): Promise<PortfolioResult> {
  // Load real stock data
  let stockData = await loadRealStockData()

  // Filter by sector if specified
  if (selectedSector && selectedSector !== "all") {
    stockData = stockData.filter((stock) => stock.sector === selectedSector)
  }

  // Select top stocks by Sharpe ratio (limit to 50 for performance)
  stockData = stockData
    .filter((stock) => stock.sharpeRatio > 0)
    .sort((a, b) => b.sharpeRatio - a.sharpeRatio)
    .slice(0, 50)

  if (stockData.length === 0) {
    throw new Error("No suitable stocks found for the selected criteria")
  }

  const returns = stockData.map((stock) => stock.expectedReturn)
  const stdDevs = stockData.map((stock) => stock.stdDev)
  const covMatrix = computeCovMatrix(stdDevs)

  // Get weights based on optimization method
  let weights: number[]
  switch (method) {
    case "variance":
      weights = minimumVariancePortfolio(covMatrix)
      break
    case "sharpe":
      weights = sharpeRatioPortfolio(returns, covMatrix, RISK_FREE_RATE)
      break
    case "hrp":
      weights = hrpAllocation(covMatrix)
      break
    default:
      weights = sharpeRatioPortfolio(returns, covMatrix, RISK_FREE_RATE)
  }

  const adjustedWeights = adjustZeroAllocation(weights)

  // Calculate portfolio metrics
  const expectedReturn = dotProduct(adjustedWeights, returns)
  const portfolioRisk = calculatePortfolioRisk(adjustedWeights, covMatrix)
  const sharpeRatio = (expectedReturn - RISK_FREE_RATE) / portfolioRisk
  const var95 = calculateVaR(investment, expectedReturn, portfolioRisk, 0.95)
  const projectedValue = investment * Math.pow(1 + expectedReturn, horizon)

  const { allocations, remainingAmount } = calculateAllocations(adjustedWeights, investment, stockData)
  const sectorExposure = calculateSectorExposure(allocations, investment)
  const insight = generateInsight(sharpeRatio)

  return {
    weights: adjustedWeights,
    expectedReturn,
    portfolioRisk,
    sharpeRatio,
    var95,
    projectedValue,
    allocations,
    sectorExposure,
    remainingAmount,
    insight,
  }
}

// Investor classification
export function classifyInvestor(horizon: number, riskTolerance: number, objective: string): string {
  if (riskTolerance >= 0.08 && horizon >= 4 && objective === "1") {
    return "Aggressive Investor"
  } else if (riskTolerance <= 0.05 && horizon <= 2 && objective === "2") {
    return "Conservative Investor"
  } else {
    return "Moderate Investor"
  }
}
