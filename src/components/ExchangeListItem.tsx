import { Divider } from "@mui/material"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import styles from "./ExchangeListItem.module.css"

export function ExchangeListItem({ exchangeInfo }) {
  const volumeUsd = Math.round(exchangeInfo.volumeUsd)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return (
    <>
      <div className={styles.container}>
        <div className={styles.nameAndRank}>
          <Typography>{exchangeInfo.rank}</Typography>
          <Link to={`/exchangeDetails/${exchangeInfo.exchangeId}`}>
            <Typography>{exchangeInfo.name}</Typography>
          </Link>
        </div>
        <Typography>{volumeUsd}</Typography>
      </div>
      <Divider sx={{ width: "100%" }} />
    </>
  )
}
