export interface ExchangeApiItem {
  exchangeId: string
  exchangeUrl: string
  name: string
  percentTotalVolume: string
  rank: string
  socket: boolean
  tradingPairs: string
  updated: number
  volumeUsd: string
}

export interface ExchangeChartData {
  name: string
  percentTotalVolume: number
}
