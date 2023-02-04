import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { FavoriteContext } from "../context/FavoriteContext"
import { Context, useContext } from "react"
import { IconButton } from "@mui/material"
import { FavoriteValues } from "../types/Favorite"

interface Props {
  cryptoID: string
}

export function FavoriteButton({ cryptoID }: Props) {
  const { favorites, setFavorite, unsetFavorite } = useContext<FavoriteValues>(
    FavoriteContext as Context<FavoriteValues>
  )
  return (
    <>
      {favorites && favorites.includes(cryptoID) ? (
        <IconButton
          onClick={() => {
            unsetFavorite(cryptoID)
          }}
          color="error"
        >
          <FavoriteIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            setFavorite(cryptoID)
          }}
          color="error"
        >
          <FavoriteBorderIcon />
        </IconButton>
      )}
    </>
  )
}
