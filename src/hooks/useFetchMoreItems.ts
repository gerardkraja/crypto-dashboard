import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CryptoApiItem } from "../types/Crypto"
import { ExchangeApiItem } from "../types/Exchange"

export function useFetchMoreItems(): [
  CryptoApiItem[] | ExchangeApiItem[] | undefined,
  number | undefined
] {
  const [data, setData] = useState<
    CryptoApiItem[] | ExchangeApiItem[] | undefined
  >(undefined)
  const [nrPages, setNrPages] = useState<number | undefined>(undefined)
  const params = useParams()
  useEffect(() => {
    async function fetchData() {
      const pageType = params.pageType
      if (pageType === "cryptos") {
        const response = await fetch("https://api.coincap.io/v2/assets")
        setData((await response.json()).data)
      } else if (pageType === "favorites") {
        const localStorageData = localStorage.getItem("favorites")
        const favorites =
          localStorageData === null ? null : JSON.parse(localStorageData)
        const response =
          favorites.length === 0
            ? []
            : await fetch(
                "https://api.coincap.io/v2/assets?" +
                  new URLSearchParams({ ids: favorites })
              )
        setData((await (response as Response).json()).data)
      } else if (pageType === "exchanges") {
        const response = await fetch("https://api.coincap.io/v2/exchanges")
        setData((await response.json()).data)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (data) {
      setNrPages(Math.ceil(data.length / 20.0))
    }
  }, [data])

  return [data, nrPages]
}
