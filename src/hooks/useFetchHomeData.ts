import { useEffect, useState } from "react"

export function useFetchHomeData() {
  const [cryptoData, setCryptoData] = useState(undefined)
  const [favoriteData, setFavoriteData] = useState(undefined)
  const [exchangeData, setExchangeData] = useState(undefined)
  useEffect(() => {
    async function fetchData() {
      const storedFavorites = localStorage.getItem("favorites")
      let favorites
      //if you pass null to the ids parameter for the favorites
      //you get back an empty array
      if (
        storedFavorites === null ||
        JSON.parse(storedFavorites).length === 0
      ) {
        favorites === null
      } else {
        favorites = JSON.parse(storedFavorites)
      }
      const nrItems = "8"
      const responses = await Promise.all([
        fetch(
          "https://api.coincap.io/v2/assets?" +
            new URLSearchParams({ limit: "20" })
        ),
        fetch(
          "https://api.coincap.io/v2/assets?" +
            new URLSearchParams({ limit: nrItems, ids: favorites })
        ),
        fetch(
          "https://api.coincap.io/v2/exchanges?" +
            new URLSearchParams({ limit: nrItems })
        ),
      ])
      const jsonData = await Promise.all([
        responses[0].json(),
        responses[1].json(),
        responses[2].json(),
      ])
      setCryptoData(jsonData[0].data)
      setFavoriteData(jsonData[1].data)
      //Remove unnecessary data field
      setExchangeData(jsonData[2].data.slice(0, jsonData[2].data.length + 1))
    }
    fetchData()
  }, [])
  return [cryptoData, favoriteData, exchangeData]
}
