// Script to fetch and process the stock data from CSV
const csvUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Results-NKZabn7DT1PskftLucUz0WkexHyrZC.csv"

async function fetchAndProcessStockData() {
  try {
    console.log("Fetching stock data from CSV...")
    const response = await fetch(csvUrl)
    const csvText = await response.text()

    // Parse CSV
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

    console.log("Headers found:", headers.slice(0, 10)) // Show first 10 headers

    const stocks = []

    for (let i = 1; i < lines.length && i <= 301; i++) {
      // Process up to 300 stocks
      const line = lines[i].trim()
      if (!line) continue

      const values = line.split(",").map((v) => v.trim().replace(/"/g, ""))

      if (values.length < headers.length) continue

      const stock = {}
      headers.forEach((header, index) => {
        stock[header] = values[index]
      })

      // Skip if essential data is missing
      if (!stock.Ticker || !stock["Current Price"] || !stock.Sector) continue

      // Calculate expected return from price projections
      const currentPrice = Number.parseFloat(stock["Current Price"])
      const price2030 = Number.parseFloat(stock["2030-12"])

      if (isNaN(currentPrice) || isNaN(price2030) || currentPrice <= 0) continue

      // Calculate annualized return (5 years from 2026 to 2030)
      const totalReturn = (price2030 - currentPrice) / currentPrice
      const annualizedReturn = Math.pow(1 + totalReturn, 1 / 5) - 1

      // Get volatility and other metrics
      const volatility = Number.parseFloat(stock["Std Dev (%)"]) / 100 || 0.15
      const sharpeRatio = Number.parseFloat(stock["Sharpe Ratio"]) || 0
      const beta = Number.parseFloat(stock["Beta"]) || 1
      const maxDrawdown = Math.abs(Number.parseFloat(stock["Max Drawdown (%)"]) / 100) || 0.2

      const processedStock = {
        ticker: stock.Ticker,
        sector: stock.Sector.toLowerCase().replace(/\s+/g, ""),
        currentPrice: currentPrice,
        expectedReturn: annualizedReturn,
        stdDev: volatility,
        sharpeRatio: sharpeRatio,
        beta: beta,
        maxDrawdown: maxDrawdown,
        var95: Math.abs(Number.parseFloat(stock["VaR (95%)"]) / 100) || 0.05,
      }

      // Only include stocks with reasonable metrics
      if (
        processedStock.expectedReturn > -0.5 &&
        processedStock.expectedReturn < 2.0 &&
        processedStock.stdDev > 0 &&
        processedStock.stdDev < 1.0
      ) {
        stocks.push(processedStock)
      }
    }

    console.log(`Processed ${stocks.length} stocks`)

    // Group by sector
    const sectorCounts = {}
    stocks.forEach((stock) => {
      sectorCounts[stock.sector] = (sectorCounts[stock.sector] || 0) + 1
    })

    console.log("Stocks by sector:", sectorCounts)

    // Show sample of processed data
    console.log("Sample processed stocks:")
    stocks.slice(0, 5).forEach((stock) => {
      console.log(
        `${stock.ticker}: Return=${(stock.expectedReturn * 100).toFixed(2)}%, Vol=${(stock.stdDev * 100).toFixed(2)}%, Sector=${stock.sector}`,
      )
    })

    // Sort by Sharpe ratio and show top performers
    const topPerformers = stocks
      .filter((s) => s.sharpeRatio > 0)
      .sort((a, b) => b.sharpeRatio - a.sharpeRatio)
      .slice(0, 10)

    console.log("\nTop 10 performers by Sharpe ratio:")
    topPerformers.forEach((stock) => {
      console.log(
        `${stock.ticker}: Sharpe=${stock.sharpeRatio.toFixed(2)}, Return=${(stock.expectedReturn * 100).toFixed(2)}%`,
      )
    })

    return stocks
  } catch (error) {
    console.error("Error processing stock data:", error)
    return []
  }
}

// Execute the function
fetchAndProcessStockData()
