import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import {
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  Typography,
  TextField,
} from "@mui/material"

import { FavoriteButton } from "../../components/FavoriteButton"
import styles from "./styles.module.css"
import { CryptoDetailsChart } from "../../components/CryptoDetailsChart"
import { useFetchCryptoDetails } from "../../hooks/useFetchCryptoDetails"

//TODO: move the graph in a separate component
export default function CryptoDetails() {
  const { cryptoID } = useParams()
  const [cryptoInfo, chartInfo] = useFetchCryptoDetails()
  console.log(cryptoInfo)
  const [chartIndex, setChartIndex] = useState("day")
  //TODO: pull this out in a separate hook
  return (
    <div className={styles.page}>
      <div className={styles.details}>
        <Card sx={{ flex: 1 }}>
          {cryptoInfo ? (
            <>
              <Typography>{cryptoInfo.name}</Typography>
              <Typography>{cryptoInfo.priceUsd}</Typography>
              <Typography>{cryptoInfo.changePercent24Hr}</Typography>
              <FavoriteButton cryptoID={cryptoID} />
            </>
          ) : (
            <CircularProgress />
          )}
        </Card>
      </div>
      <div className={styles.chart}>
        {chartInfo ? (
          <Card
            sx={{
              width: "100%",
              padding: "1rem 2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Price over time</Typography>
            <CryptoDetailsChart chartIndex={chartIndex} chartInfo={chartInfo} />
            <ToggleButtonGroup
              color="primary"
              value={chartIndex}
              exclusive
              onChange={(e, newValue) => setChartIndex(newValue)}
              aria-label="Platform"
            >
              <ToggleButton disabled={chartIndex === "day"} value="day">
                1D
              </ToggleButton>
              <ToggleButton disabled={chartIndex === "week"} value="week">
                1W
              </ToggleButton>
              <ToggleButton disabled={chartIndex === "month"} value="month">
                1M
              </ToggleButton>
              <ToggleButton disabled={chartIndex === "year"} value="year">
                1Y
              </ToggleButton>
            </ToggleButtonGroup>
          </Card>
        ) : (
          <CircularProgress />
        )}
      </div>
      <Card className={styles.converter} sx={{ flex: 1 }}>
        {cryptoInfo ? (
          <>
            <Typography className={styles.currencyName}>USD</Typography>
            <TextField className={styles.currencyInput} placeholder={"0"} />
            <CurrencyExchangeIcon className={styles.exchangeIcon} />
            <Typography className={styles.cryptoName}>
              {cryptoInfo.name}
            </Typography>
            <TextField className={styles.cryptoInput} placeholder={"0"} />
          </>
        ) : (
          <CircularProgress />
        )}
      </Card>
    </div>
  )
}
