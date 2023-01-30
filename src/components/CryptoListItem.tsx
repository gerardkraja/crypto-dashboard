import styles from "./CryptoListItem.module.css"
import Typography from "@mui/material/Typography"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { Link } from "react-router-dom"

import { FavoriteButton } from "./FavoriteButton"
import { Divider } from "@mui/material"

export function CryptoListItem({ cryptoInfo, isFavoriteEnabled }) {
  return (
    <>
      <div className={styles.cryptoButton}>
        <div className={styles.nameAndRank}>
          <Typography>{cryptoInfo.rank}</Typography>
          <Link to={`/cryptoDetails/${cryptoInfo.id}`}>
            <Typography>{cryptoInfo.name}</Typography>
          </Link>
        </div>
        <div className={styles.price}>
          <Typography>
            {`$${parseFloat(cryptoInfo.priceUsd).toFixed(2)}`}
          </Typography>
        </div>
        <div className={styles.changePercent}>
          {isFavoriteEnabled === true && (
            <FavoriteButton cryptoID={cryptoInfo.id} />
          )}
          {cryptoInfo.changePercent24Hr > 0 ? (
            <ArrowDropUpIcon color="success" />
          ) : (
            <ArrowDropDownIcon color="error" />
          )}
          <Typography>
            {parseFloat(cryptoInfo.changePercent24Hr).toFixed(2) + "%"}
          </Typography>
        </div>
      </div>
      <Divider sx={{ width: "100%" }} />
    </>
  )
}
