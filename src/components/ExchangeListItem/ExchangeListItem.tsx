import { Divider } from "@mui/material"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import { ExchangeApiItem } from "../../types/Exchange"
import styles from "./ExchangeListItem.module.css"

interface Props {
  exchangeInfo: ExchangeApiItem
}

export function ExchangeListItem({ exchangeInfo }: Props) {
  const volumeUsd = Math.round(parseFloat(exchangeInfo.volumeUsd))
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
