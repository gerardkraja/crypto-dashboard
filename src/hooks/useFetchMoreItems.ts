import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export function useFetchMoreItems() {
  const [data, setData] = useState(undefined)
  const [nrPages, setNrPages] = useState(undefined)
  const params = useParams()
  useEffect(() => {
    async function fetchData() {
      const pageType = params.pageType
      if (pageType === "cryptos") {
        const response = await fetch("https://api.coincap.io/v2/assets")
        setData((await response.json()).data)
      } else if (pageType === "favorites") {
        const favorites = JSON.parse(localStorage.getItem("favorites"))
        const response = await fetch(
          "https://api.coincap.io/v2/assets?" +
            new URLSearchParams({ ids: favorites })
        )
        setData((await response.json()).data)
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
