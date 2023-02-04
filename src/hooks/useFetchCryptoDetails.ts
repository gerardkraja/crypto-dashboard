import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ChartDataResult, CryptoApiItem } from "../types/Crypto"

const weekInMs = 604800000
const monthInMs = 2592000000
const yearInMs = 31536000000

const requestStart = Date.now()

export function useFetchCryptoDetails() {
  const { cryptoID } = useParams()

  const [cryptoInfo, setCryptoInfo] = useState(undefined)
  const [chartInfo, setChartInfo] = useState<ChartDataResult | undefined>(
    undefined
  )
  useEffect(() => {
    async function preprocessChart(
      apiResponse: Response
    ): Promise<CryptoApiItem[]> {
      const jsonData = await apiResponse.json()
      const data = jsonData.data.map((dataItem: CryptoApiItem) => {
        return {
          ...dataItem,
          priceUsd: parseFloat(dataItem.priceUsd.toString()).toFixed(1),
          date: dataItem.date.substring(0, 10),
        }
      })
      return data
    }
    async function fetchCryptoInfo() {
      const cryptoInfoData = await fetch(
        `https://api.coincap.io/v2/assets/${cryptoID}`
      )
      setCryptoInfo((await cryptoInfoData.json()).data)
      const chartData = await Promise.all([
        fetch(
          `https://api.coincap.io/v2/assets/${cryptoID}/history?` +
            new URLSearchParams({
              interval: "m30",
              start: (requestStart - weekInMs).toString(),
              end: requestStart.toString(),
            })
        ),
        fetch(
          `https://api.coincap.io/v2/assets/${cryptoID}/history?` +
            new URLSearchParams({
              interval: "h1",
              start: (requestStart - monthInMs).toString(),
              end: requestStart.toString(),
            })
        ),
        fetch(
          `https://api.coincap.io/v2/assets/${cryptoID}/history?` +
            new URLSearchParams({
              interval: "d1",
              start: (requestStart - yearInMs).toString(),
              end: requestStart.toString(),
            })
        ),
      ])
      const weekResults: CryptoApiItem[] = await preprocessChart(chartData[0])
      const chartDataResult: ChartDataResult = {
        week: weekResults,
        day: weekResults.slice(0, 97),
        month: await preprocessChart(chartData[1]),
        year: await preprocessChart(chartData[2]),
      }
      setChartInfo({ ...chartDataResult })
      //Recharts does not hide decimals on yaxis if you dont calculate the domain values.
    }
    fetchCryptoInfo()
  }, [])
  return [cryptoInfo, chartInfo]
}
