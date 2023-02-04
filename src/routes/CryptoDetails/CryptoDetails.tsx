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
import { useCurrencyConverter } from "../../hooks/useCurrencyConverter"

export default function CryptoDetails() {
  const { cryptoID } = useParams()
  const [cryptoInfo, chartInfo] = useFetchCryptoDetails()
  const [chartIndex, setChartIndex] = useState("day")
  const [currencyInput, cryptoInput, calculateCrypto, calculateCurrency] =
    useCurrencyConverter(cryptoInfo?.priceUsd)
  return (
    <div className={styles.page}>
      <Card className={styles.details}>
        {cryptoInfo ? (
          <>
            <div className={styles.detailsTitle}>
              <Typography variant="h4">{cryptoInfo.name}</Typography>
              <FavoriteButton cryptoID={cryptoID as string} />
            </div>

            <div className={styles.detailsRank}>
              <Typography variant="h5" color="grey">
                Rank
              </Typography>
              <Typography variant="h4">{cryptoInfo.rank}</Typography>
            </div>
            <div className={styles.detailsPrice}>
              <Typography variant="h6" color="grey">
                Price
              </Typography>
              <Typography variant="h5">
                {parseFloat(cryptoInfo.priceUsd).toFixed(2)}
              </Typography>
            </div>
            <div className={styles.detailsChange}>
              <Typography variant="h6" color="grey">
                Change
              </Typography>
              <Typography variant="h5">
                {parseFloat(cryptoInfo.changePercent24Hr).toFixed(2)}
              </Typography>
            </div>
            <div className={styles.detailsSupply}>
              <Typography variant="h6" color="grey">
                Supply
              </Typography>
              <Typography variant="h5">
                {parseFloat(cryptoInfo.supply).toFixed(0)}
              </Typography>
            </div>
            <div className={styles.detailsVolume}>
              <Typography variant="h6" color="grey">
                VWAP
              </Typography>
              <Typography variant="h5">
                {parseFloat(cryptoInfo.vwap24Hr).toFixed(2)}
              </Typography>
            </div>
          </>
        ) : (
          <CircularProgress />
        )}
      </Card>
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
            <Typography sx={{ textAlign: "center" }} variant="h5">
              Price over time
            </Typography>
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
            <Typography variant="h5" className={styles.title}>
              Converter
            </Typography>
            <Typography className={styles.currencyName}>USD</Typography>
            <TextField
              value={currencyInput}
              onChange={calculateCrypto}
              className={styles.currencyInput}
              placeholder={"0"}
            />
            <CurrencyExchangeIcon className={styles.exchangeIcon} />
            <Typography className={styles.cryptoName}>
              {cryptoInfo.name}
            </Typography>
            <TextField
              value={cryptoInput}
              onChange={calculateCurrency}
              className={styles.cryptoInput}
              placeholder={"0"}
            />
          </>
        ) : (
          <CircularProgress />
        )}
      </Card>
    </div>
  )
}
