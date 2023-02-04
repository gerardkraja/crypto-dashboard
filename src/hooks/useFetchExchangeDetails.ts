import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ExchangeApiItem } from "../types/Exchange"

export function useFetchExchangeDetails(): [
  ExchangeApiItem | undefined,
  ExchangeApiItem[] | undefined
] {
  const [exchangeInfo, setExchangeInfo] = useState<ExchangeApiItem | undefined>(
    undefined
  )
  const [chartData, setChartData] = useState<ExchangeApiItem[] | undefined>(
    undefined
  )
  const params = useParams()
  useEffect(() => {
    async function fetchData() {
      const responses = await Promise.all([
        fetch(`https://api.coincap.io/v2/exchanges/${params.exchangeID}`),
        fetch(
          `https://api.coincap.io/v2/exchanges?` +
            new URLSearchParams({ limit: "5" })
        ),
      ])
      setExchangeInfo((await responses[0].json()).data)
      setChartData((await responses[1].json()).data)
    }
    fetchData()
  }, [])
  return [exchangeInfo, chartData]
}
