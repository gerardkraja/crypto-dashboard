import { CartesianGrid, BarChart, Tooltip, Bar, XAxis, YAxis } from "recharts"
import { Card, CircularProgress, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { CryptoApiItem } from "../../types/Crypto"

interface Props {
  topCryptos: CryptoApiItem[] | undefined
}

export function TradingVolumeChart({ topCryptos }: Props) {
  const theme = useTheme()
  const [chartData, setChartData] = useState<undefined | CryptoApiItem[]>(
    undefined
  )
  useEffect(() => {
    if (topCryptos) {
      setChartData(
        topCryptos
          .map((element: CryptoApiItem) => {
            return { ...element, vwap24Hr: Math.round(element.vwap24Hr) }
          })
          .slice(0, 5)
      )
    }
  }, [topCryptos])
  const isMobile = window.innerWidth < 768
  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          padding: isMobile ? "1rem" : 0,
        }}
      >
        <Typography sx={{ textAlign: "center" }} variant="h5">
          Volume weighted average price (24hr)
        </Typography>
        {chartData ? (
          <BarChart width={isMobile ? 300 : 450} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"symbol"} />
            <YAxis domain={["0", "dataMax + 1000"]} scale="log" />
            <Bar
              dataKey="vwap24Hr"
              fill={String(theme.palette.primary.light)}
            />
            <Tooltip />
          </BarChart>
        ) : (
          <CircularProgress />
        )}
      </Card>
    </>
  )
}
