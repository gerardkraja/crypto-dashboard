import { useLoaderData, useParams } from "react-router-dom"
import { Typography, CircularProgress, Pagination, Card } from "@mui/material"
import { useState } from "react"

import { CryptoListItem } from "../../components/CryptoListItem/CryptoListItem"
import { ExchangeListItem } from "../../components/ExchangeListItem/ExchangeListItem"
import { useFetchMoreItems } from "../../hooks/useFetchMoreItems"
import { CryptoApiItem } from "../../types/Crypto"
import { ExchangeApiItem } from "../../types/Exchange"

type Options = {
  cryptos: {
    title: string
  }
  favorites: {
    title: string
  }
  exchanges: {
    title: string
  }
  [key: string]: any
}

export function MoreItems() {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, nrPages] = useFetchMoreItems()
  const params = useParams()
  const pageType = params.pageType as string
  const options: Options = {
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
  const isMobile = window.innerWidth < 768
  return (
    <div
      style={{
        width: isMobile ? "90%" : "50%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        sx={{ padding: "2rem 0 1rem 2rem", textAlign: "center" }}
      >
        {options[pageType]["title"]}
      </Typography>
      {!data && <CircularProgress />}
      {data &&
        pageType === "cryptos" &&
        (data as CryptoApiItem[])
          .slice((currentPage - 1) * 20, currentPage * 20)
          .map((crypto) => {
            return <CryptoListItem key={crypto.id} cryptoInfo={crypto} />
          })}
      {data &&
        pageType === "favorites" &&
        (data as CryptoApiItem[])
          .slice((currentPage - 1) * 20, currentPage * 20)
          .map((favorite) => {
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
        (data as ExchangeApiItem[])
          .slice((currentPage - 1) * 20, currentPage * 20)
          .map((exchange) => {
            return (
              <ExchangeListItem
                key={exchange.exchangeId}
                exchangeInfo={exchange}
              />
            )
          })}
      <Pagination
        style={{ alignSelf: "center", padding: "1rem" }}
        count={nrPages}
        page={currentPage}
        onChange={(e, value) => {
          setCurrentPage(value)
        }}
      />
    </div>
  )
}
