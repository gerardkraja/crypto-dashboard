import { Typography } from "@mui/material"

export const EmptyFavorites = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "60%",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" color="GrayText">
        No Favorites yet
      </Typography>
      <Typography color="GrayText">
        Keep track of your favorite cryptos by clicking the ♡ button.
      </Typography>
    </div>
  )
}
