import { Button, CircularProgress, Divider } from "@mui/material"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"
import { CryptoApiItem } from "../types/Crypto"
import { ExchangeApiItem } from "../types/Exchange"

import { CryptoListItem } from "./CryptoListItem/CryptoListItem"
import { EmptyFavorites } from "./EmptyFavorites"
import { ExchangeListItem } from "./ExchangeListItem/ExchangeListItem"

interface Props {
  type: string
  data: CryptoApiItem[] | ExchangeApiItem[] | undefined
}

type Options = {
  cryptos: {
    title: string
    link: string
  }
  favorites: {
    title: string
    link: string
  }
  exchanges: {
    title: string
    link: string
  }
  [key: string]: any
}
const isMobile = window.innerWidth < 768

export function InfoList({ type, data }: Props) {
  const navigate = useNavigate()
  const options: Options = {
    cryptos: {
      title: "Top cryptocurrencies",
      link: "/more/cryptos",
    },
    favorites: {
      title: "Favorites",
      link: "/more/favorites",
    },
    exchanges: {
      title: "Top exchanges trading volume",
      link: "/more/exchanges",
    },
  }
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: isMobile ? "1rem" : 0,
        gap: isMobile ? "1rem" : 0,
      }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h5">
        {options[type]["title"]}
      </Typography>
      <div
        style={{
          width: "95%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!data && <CircularProgress />}
        {data &&
          type === "cryptos" &&
          (data as CryptoApiItem[]).map((crypto: CryptoApiItem) => (
            <CryptoListItem key={crypto.id} cryptoInfo={crypto} />
          ))}
        {data && type === "favorites" ? (
          data.length !== 0 ? (
            (data as CryptoApiItem[]).map((favorite: CryptoApiItem) => (
              <CryptoListItem
                key={favorite.id}
                cryptoInfo={favorite}
                isFavoriteEnabled={true}
              />
            ))
          ) : (
            <EmptyFavorites />
          )
        ) : null}
        {data &&
          type === "exchanges" &&
          (data as ExchangeApiItem[]).map((exchange: ExchangeApiItem) => (
            <ExchangeListItem
              key={exchange.exchangeId}
              exchangeInfo={exchange}
            />
          ))}
      </div>
      <Button
        variant="outlined"
        disabled={type === "favorites" && data?.length === 0}
        onClick={() => navigate(options[type]["link"])}
      >
        Show more
      </Button>
    </Card>
  )
}
