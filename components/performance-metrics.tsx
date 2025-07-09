interface PerformanceMetricsProps {
  optimization: string
  investmentAmount?: number
}

export function PerformanceMetrics({ optimization, investmentAmount = 50000 }: PerformanceMetricsProps) {
  // Remove the hardcoded: const investmentAmount = 50000
  const horizon = 3

  return (
    <div>
      <h2>Performance Metrics</h2>
      <p>Optimization: {optimization}</p>
      <p>Investment Amount: {investmentAmount}</p>
      <p>Horizon: {horizon} years</p>
    </div>
  )
}
