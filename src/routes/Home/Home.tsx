import styles from "./Home.module.css"
import { useLoaderData } from "react-router-dom"

import { InfoList } from "../../components/InfoList"
import { TradingVolumeChart } from "./TradingVolumeChart"
import { ExchangeChart } from "../../components/ExchangeChart"
import { useFetchHomeData } from "../../hooks/useFetchHomeData"
import { Card } from "@mui/material"

export default function Home() {
  const [cryptoData, favoriteData, exchangeData] = useFetchHomeData()
  return (
    <div className={styles.container}>
      <div className={styles.tradingChart}>
        <TradingVolumeChart topCryptos={cryptoData} />
      </div>
      <div className={styles.exchangeChart}>
        <ExchangeChart data={exchangeData} />
      </div>
      <div className={styles.cryptoList}>
        <InfoList type="cryptos" data={cryptoData} />
      </div>
      <div className={styles.favoriteList}>
        <InfoList type="favorites" data={favoriteData} />
      </div>
      <Card className={styles.exchangeList}>
        <InfoList type="exchanges" data={exchangeData} />
      </Card>
    </div>
  )
}
