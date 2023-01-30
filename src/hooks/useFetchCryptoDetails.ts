import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const weekInMs = 604800000
const monthInMs = 2592000000
const yearInMs = 31536000000

const requestStart = Date.now()

export function useFetchCryptoDetails() {
  const { cryptoID } = useParams()

  const [cryptoInfo, setCryptoInfo] = useState(undefined)
  const [chartInfo, setChartInfo] = useState(undefined)
  useEffect(() => {
    async function preprocessChart(apiResponse) {
      const jsonData = await apiResponse.json()
      const data = jsonData.data.map((dataItem) => {
        return {
          ...dataItem,
          priceUsd: parseFloat(dataItem.priceUsd).toFixed(1),
          date: dataItem.date.substring(0, 10),
        }
      })
      return data
    }
    //TODO: disable xaxis on mobile
    //TODO: try to reduce the number of points in the graph and see if it feels faster
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
              start: requestStart - weekInMs,
              end: requestStart,
            })
        ),
        fetch(
          `https://api.coincap.io/v2/assets/${cryptoID}/history?` +
            new URLSearchParams({
              interval: "h1",
              start: requestStart - monthInMs,
              end: requestStart,
            })
        ),
        fetch(
          `https://api.coincap.io/v2/assets/${cryptoID}/history?` +
            new URLSearchParams({
              interval: "d1",
              start: requestStart - yearInMs,
              end: requestStart,
            })
        ),
      ])
      const chartDataResult = {}
      chartDataResult.week = await preprocessChart(chartData[0])
      chartDataResult.day = chartDataResult.week.slice(0, 97)
      chartDataResult.month = await preprocessChart(chartData[1])
      chartDataResult.year = await preprocessChart(chartData[2])
      setChartInfo({ ...chartDataResult })
      //Recharts does not hide decimals on yaxis if you dont calculate the domain values.
    }
    fetchCryptoInfo()
  }, [])
  return [cryptoInfo, chartInfo]
}
