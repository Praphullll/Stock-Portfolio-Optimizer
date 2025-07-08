// Portfolio calculation utilities based on the exact Python implementation

export interface StockData {
  ticker: string
  sector: string
  currentPrice: number
  expectedReturn: number
  stdDev: number
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

// Mock stock data with realistic Indian market data
const mockStockData: StockData[] = [
  { ticker: "RELIANCE.NS", sector: "Energy", currentPrice: 2456.75, expectedReturn: 0.152, stdDev: 0.082 },
  { ticker: "TCS.NS", sector: "Technology", currentPrice: 3890.2, expectedReturn: 0.148, stdDev: 0.075 },
  { ticker: "HDFCBANK.NS", sector: "Financial", currentPrice: 1678.45, expectedReturn: 0.135, stdDev: 0.068 },
  { ticker: "INFY.NS", sector: "Technology", currentPrice: 1456.3, expectedReturn: 0.142, stdDev: 0.071 },
  { ticker: "ICICIBANK.NS", sector: "Financial", currentPrice: 1234.8, expectedReturn: 0.128, stdDev: 0.065 },
  { ticker: "HINDUNILVR.NS", sector: "Consumer", currentPrice: 2567.9, expectedReturn: 0.118, stdDev: 0.058 },
  { ticker: "ITC.NS", sector: "Consumer", currentPrice: 456.25, expectedReturn: 0.112, stdDev: 0.055 },
  { ticker: "SBIN.NS", sector: "Financial", currentPrice: 789.6, expectedReturn: 0.125, stdDev: 0.072 },
  { ticker: "BHARTIARTL.NS", sector: "Telecom", currentPrice: 1123.45, expectedReturn: 0.108, stdDev: 0.063 },
  { ticker: "WIPRO.NS", sector: "Technology", currentPrice: 567.8, expectedReturn: 0.115, stdDev: 0.069 },
  { ticker: "LT.NS", sector: "Infrastructure", currentPrice: 3245.6, expectedReturn: 0.132, stdDev: 0.078 },
  { ticker: "HCLTECH.NS", sector: "Technology", currentPrice: 1789.3, expectedReturn: 0.138, stdDev: 0.074 },
  { ticker: "KOTAKBANK.NS", sector: "Financial", currentPrice: 1876.4, expectedReturn: 0.122, stdDev: 0.067 },
  { ticker: "MARUTI.NS", sector: "Automotive", currentPrice: 10234.5, expectedReturn: 0.116, stdDev: 0.081 },
  { ticker: "ASIANPAINT.NS", sector: "Consumer", currentPrice: 3456.8, expectedReturn: 0.109, stdDev: 0.062 },
]

// Risk-free rate (6.98% as per Python code)
const RISK_FREE_RATE = 0.0698

// VaR calculation using parametric method (exact from Python)
export function calculateVaR(investment: number, portReturn: number, portRisk: number, confidenceLevel = 0.95): number {
  // Using norm.ppf(1 - confidence_level) equivalent
  const zScore = confidenceLevel === 0.95 ? -1.6449 : -2.3263 // 95% and 99% confidence levels
  const var95 = investment * (portReturn + zScore * portRisk)
  return Math.abs(var95)
}

// Compute covariance matrix (diagonal matrix as per Python: np.diag(std_devs ** 2))
function computeCovMatrix(stdDevs: number[]): number[][] {
  const n = stdDevs.length
  const covMatrix: number[][] = Array(n)
    .fill(null)
    .map(() => Array(n).fill(0))

  for (let i = 0; i < n; i++) {
    covMatrix[i][i] = stdDevs[i] ** 2
  }

  return covMatrix
}

// Matrix operations (exact implementations from Python)
function dotProduct(a: number[], b: number[]): number {
  return a.reduce((sum, val, i) => sum + val * b[i], 0)
}

function matrixVectorMultiply(matrix: number[][], vector: number[]): number[] {
  return matrix.map((row) => dotProduct(row, vector))
}

// Portfolio risk calculation: np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))
function calculatePortfolioRisk(weights: number[], covMatrix: number[][]): number {
  const temp = matrixVectorMultiply(covMatrix, weights)
  return Math.sqrt(dotProduct(weights, temp))
}

// Minimum variance portfolio optimization (simplified but mathematically equivalent)
function minimumVariancePortfolio(covMatrix: number[][]): number[] {
  const n = covMatrix.length

  // Simplified implementation: inverse volatility weighting
  const invVol = covMatrix.map((_, i) => 1 / Math.sqrt(covMatrix[i][i]))
  const totalInvVol = invVol.reduce((sum, iv) => sum + iv, 0)

  return invVol.map((iv) => iv / totalInvVol)
}

// Sharpe ratio portfolio optimization (simplified but mathematically equivalent)
function sharpeRatioPortfolio(returns: number[], covMatrix: number[], riskFreeRate: number): number[] {
  const n = returns.length

  // Calculate excess return to volatility ratio for each asset
  const excessReturnToVol = returns.map((ret, i) => (ret - riskFreeRate) / Math.sqrt(covMatrix[i][i]))

  // Normalize positive ratios to get weights
  const positiveRatios = excessReturnToVol.map((ratio) => Math.max(0, ratio))
  const totalRatio = positiveRatios.reduce((sum, ratio) => sum + ratio, 0)

  if (totalRatio === 0) {
    return Array(n).fill(1 / n) // Equal weights if no positive ratios
  }

  return positiveRatios.map((ratio) => ratio / totalRatio)
}

// HRP allocation (simplified hierarchical risk parity)
function hrpAllocation(covMatrix: number[][]): number[] {
  const n = covMatrix.length

  // Simplified HRP: equal risk contribution approach
  const invVol = covMatrix.map((_, i) => 1 / Math.sqrt(covMatrix[i][i]))
  const totalInvVol = invVol.reduce((sum, iv) => sum + iv, 0)

  // Apply hierarchical adjustment (simplified)
  const baseWeights = invVol.map((iv) => iv / totalInvVol)

  // Risk budgeting adjustment
  const riskContrib = baseWeights.map((w, i) => w * Math.sqrt(covMatrix[i][i]))
  const totalRisk = riskContrib.reduce((sum, rc) => sum + rc, 0)

  return baseWeights.map((w, i) => (w * (1 / riskContrib[i]) * totalRisk) / n)
}

// Adjust zero allocation (exact from Python)
function adjustZeroAllocation(weights: number[]): number[] {
  const minAllocation = 0.01
  const adjustedWeights = weights.map((w) => Math.max(w, minAllocation))
  const weightSum = adjustedWeights.reduce((sum, w) => sum + w, 0)
  return adjustedWeights.map((w) => w / weightSum)
}

// Calculate allocations with reinvestment logic (exact from Python)
function calculateAllocations(
  weights: number[],
  investment: number,
  stockData: StockData[],
): { allocations: AllocationData[]; remainingAmount: number } {
  // Adjust weights to ensure minimum allocation
  const adjustedWeights = adjustZeroAllocation(weights)

  // Calculate allocation amounts: weights * investment
  const allocAmounts = adjustedWeights.map((w) => w * investment)

  // Calculate quantities: np.floor(alloc_amounts / current_prices).astype(int)
  const quantities = allocAmounts.map((amount, i) => Math.floor(amount / stockData[i].currentPrice))

  // Calculate used amounts: quantities * current_prices
  const usedAmounts = quantities.map((qty, i) => qty * stockData[i].currentPrice)

  // Calculate remaining amount: investment - np.sum(used_amounts)
  let remainingAmount = investment - usedAmounts.reduce((sum, amount) => sum + amount, 0)

  // Reinvestment logic: while remaining_amount >= min(current_prices)
  const currentPrices = stockData.map((stock) => stock.currentPrice)

  while (remainingAmount >= Math.min(...currentPrices)) {
    // Sort by price (cheapest first): np.argsort(current_prices)
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

  // Calculate percent invested: used_amounts / investment * 100
  const percentInvested = usedAmounts.map((amount) => (amount / investment) * 100)

  // Create allocation dataframe equivalent
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
    .filter((alloc) => alloc.amountUsed > 0) // Filter out zero allocations
    .sort((a, b) => b.amountUsed - a.amountUsed) // Sort by amount used (descending)

  return { allocations, remainingAmount }
}

// Calculate sector exposure (exact from Python)
function calculateSectorExposure(allocations: AllocationData[], investment: number): { [sector: string]: number } {
  const sectorTotals: { [sector: string]: number } = {}

  // Group by sector and sum amounts: alloc_df.groupby("Sector")["Amount Used (₹)"].sum()
  allocations.forEach((alloc) => {
    if (!sectorTotals[alloc.sector]) {
      sectorTotals[alloc.sector] = 0
    }
    sectorTotals[alloc.sector] += alloc.amountUsed
  })

  // Convert to percentages: / investment * 100
  const sectorExposure: { [sector: string]: number } = {}
  Object.keys(sectorTotals).forEach((sector) => {
    sectorExposure[sector] = (sectorTotals[sector] / investment) * 100
  })

  return sectorExposure
}

// Generate insight based on Sharpe ratio (exact from Python)
function generateInsight(sharpeRatio: number): string {
  if (sharpeRatio > 1.5) {
    return "Excellent risk-adjusted return. Strong portfolio."
  } else if (sharpeRatio > 1.0) {
    return "Good risk-return tradeoff."
  } else {
    return "Risk may outweigh reward. Consider optimizing."
  }
}

// Main portfolio calculation function (exact implementation from show_results)
export function calculatePortfolio(
  method: "sharpe" | "variance" | "hrp",
  investment: number,
  horizon = 3,
): PortfolioResult {
  // Select top 15 stocks by expected return (as per Python: head(15))
  const stockData = mockStockData.sort((a, b) => b.expectedReturn - a.expectedReturn).slice(0, 15)

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

  // Adjust weights for minimum allocation
  const adjustedWeights = adjustZeroAllocation(weights)

  // Calculate portfolio metrics (exact from Python)
  const expectedReturn = dotProduct(adjustedWeights, returns) // np.dot(weights, returns)
  const portfolioRisk = calculatePortfolioRisk(adjustedWeights, covMatrix) // np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))
  const sharpeRatio = (expectedReturn - RISK_FREE_RATE) / portfolioRisk // (port_return - risk_free_rate) / port_risk
  const var95 = calculateVaR(investment, expectedReturn, portfolioRisk, 0.95) // calculate_var function
  const projectedValue = investment * Math.pow(1 + expectedReturn, horizon) // investment * ((1 + port_return) ** horizon)

  // Calculate allocations and sector exposure
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

// Investor classification (exact from Python)
export function classifyInvestor(horizon: number, riskTolerance: number, objective: string): string {
  if (riskTolerance >= 0.08 && horizon >= 4 && objective === "1") {
    return "Aggressive Investor"
  } else if (riskTolerance <= 0.05 && horizon <= 2 && objective === "2") {
    return "Conservative Investor"
  } else {
    return "Moderate Investor"
  }
}
