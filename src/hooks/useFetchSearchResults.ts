import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CryptoApiItem } from "../types/Crypto"

export function useFetchSearchResults(): [
  CryptoApiItem[] | undefined,
  number | undefined
] {
  const [data, setData] = useState<CryptoApiItem[] | undefined>(undefined)
  const [nrPages, setNrPages] = useState<number | undefined>(undefined)
  const params = useParams()
  useEffect(() => {
    async function fetchData() {
      const search = params.search as string
      const response = await fetch(
        "https://api.coincap.io/v2/assets?" +
          new URLSearchParams({ search: search })
      )
      setData((await response.json()).data)
    }
    fetchData()
  }, [params])
  useEffect(() => {
    if (data) {
      setNrPages(Math.ceil(data.length / 20.0))
    }
  }, [data])

  return [data, nrPages]
}
