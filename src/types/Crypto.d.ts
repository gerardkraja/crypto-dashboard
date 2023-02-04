export interface ChartDataResult {
  day: CryptoApiItem[]
  week: CryptoApiItem[]
  month: CryptoApiItem[]
  year: CryptoApiItem[]
  [key: string]
}

export interface CryptoApiItem {
  changePercent24Hr: number
  explorer: string
  id: string
  marketCapUsd: number
  maxSupply: null | number
  name: string
  priceUsd: number
  rank: string
  supply: number
  symbol: string
  volumeUsd24Hr: number
  vwap24Hr: number
  date: string
}
