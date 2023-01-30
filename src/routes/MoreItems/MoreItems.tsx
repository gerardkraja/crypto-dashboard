import { useLoaderData, useParams } from "react-router-dom"
import { Typography, CircularProgress, Pagination, Card } from "@mui/material"
import { useState } from "react"

import { CryptoListItem } from "../../components/CryptoListItem"
import { ExchangeListItem } from "../../components/ExchangeListItem"
import { useFetchMoreItems } from "../../hooks/useFetchMoreItems"

//TODO: if search returns no results or there are no favorites show something
export function MoreItems() {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, nrPages, pageNumbers] = useFetchMoreItems()
  const { pageType } = useParams()
  const options = {
    cryptos: {
      title: "Cryptocurrencies",
    },
    favorites: {
      title: "Favorites",
    },
    exchanges: {
      title: "Exchanges trade volume",
    },
  }

  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" sx={{ padding: "2rem 0 1rem 2rem" }}>
        {options[pageType]["title"]}
      </Typography>
      {!data && <CircularProgress />}
      {data &&
        pageType === "cryptos" &&
        data.slice((currentPage - 1) * 20, currentPage * 20).map((crypto) => {
          return <CryptoListItem key={crypto.id} cryptoInfo={crypto} />
        })}
      {data &&
        pageType === "favorites" &&
        data.slice((currentPage - 1) * 20, currentPage * 20).map((favorite) => {
          return (
            <CryptoListItem
              key={favorite.id}
              isFavoriteEnabled={true}
              cryptoInfo={favorite}
            />
          )
        })}
      {data &&
        pageType === "exchanges" &&
        data.slice((currentPage - 1) * 20, currentPage * 20).map((exchange) => {
          return (
            <ExchangeListItem
              key={exchange.exchangeId}
              exchangeInfo={exchange}
            />
          )
        })}
      <Pagination
        style={{ alignSelf: "center", paddingTop: "1rem" }}
        count={nrPages}
        page={currentPage}
        onChange={(e, value) => {
          setCurrentPage(value)
        }}
      />
    </div>
  )
}
