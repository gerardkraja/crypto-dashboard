import { Button, CircularProgress, Divider } from "@mui/material"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"

import { CryptoListItem } from "./CryptoListItem"
import { EmptyFavorites } from "./EmptyFavorites"
import { ExchangeListItem } from "./ExchangeListItem"

export function InfoList({ type, data }) {
  const navigate = useNavigate()
  const options = {
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
      }}
    >
      <Typography variant="h5">{options[type]["title"]}</Typography>
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
          data.map((crypto) => (
            <>
              <CryptoListItem key={crypto.id} cryptoInfo={crypto} />
            </>
          ))}
        {data && type === "favorites" ? (
          data.length !== 0 ? (
            data.map((favorite) => (
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
          data.map((exchange) => (
            <ExchangeListItem
              key={exchange.exchangeId}
              exchangeInfo={exchange}
            />
          ))}
      </div>
      <Button
        variant="outlined"
        onClick={() => navigate(options[type]["link"])}
      >
        Show more
      </Button>
    </Card>
  )
}
