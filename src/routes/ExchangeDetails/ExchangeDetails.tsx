import { CircularProgress, Card, Typography } from "@mui/material"
import styles from "./ExchangeDetails.module.css"

import { ExchangeChart } from "../../components/ExchangeChart"
import { useFetchExchangeDetails } from "../../hooks/useFetchExchangeDetails"

export default function ExchangeDetails() {
  const [exchangeInfo, chartData] = useFetchExchangeDetails()

  return (
    <div className={styles.page}>
      <Card className={styles.details}>
        {exchangeInfo ? (
          <>
            <Typography variant="h4" className={styles.detailsTitle}>
              {exchangeInfo.name}
            </Typography>
            <div className={styles.detailsRank}>
              <Typography color="grey" variant="h5">
                Rank
              </Typography>
              <Typography variant="h4">{exchangeInfo.rank}</Typography>
            </div>
            <div className={styles.detailsMarkets}>
              <Typography variant="h6" color="grey">
                Markets
              </Typography>
              <Typography variant="h5">{exchangeInfo.tradingPairs}</Typography>
            </div>
            <div className={styles.detailsVolume}>
              <Typography variant="h6" color="grey">
                Volume
              </Typography>
              <Typography variant="h5">
                {Math.round(exchangeInfo.volumeUsd)}
              </Typography>
            </div>
            <div className={styles.detailsLink}>
              <Typography variant="h6" color="grey">
                Website
              </Typography>
              <a href={exchangeInfo.exchangeUrl}>
                <Typography variant="h5">{exchangeInfo.exchangeUrl}</Typography>
              </a>
            </div>
          </>
        ) : (
          <CircularProgress />
        )}
      </Card>
      <div className={styles.chart}>
        {chartData ? <ExchangeChart data={chartData} /> : <CircularProgress />}
      </div>
    </div>
  )
}
