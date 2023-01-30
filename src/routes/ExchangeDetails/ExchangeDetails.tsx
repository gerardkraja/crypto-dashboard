import { CircularProgress, Card, Typography } from "@mui/material"

import { ExchangeChart } from "../../components/ExchangeChart"
import { useFetchExchangeDetails } from "../../hooks/useFetchExchangeDetails"

export default function ExchangeDetails() {
  const [exchangeInfo, chartData] = useFetchExchangeDetails()

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Card>
        {exchangeInfo ? (
          <>
            <Typography>{exchangeInfo.name}</Typography>
            <Typography>{exchangeInfo.rank}</Typography>
            <Typography>{exchangeInfo.tradingPairs}</Typography>
            <Typography>{exchangeInfo.volumeUsd}</Typography>
            <Typography>{exchangeInfo.exchangeUrl}</Typography>
          </>
        ) : (
          <CircularProgress />
        )}
      </Card>
      {chartData ? (
        <Card>
          <ExchangeChart data={chartData} />
        </Card>
      ) : (
        <CircularProgress />
      )}
    </div>
  )
}
