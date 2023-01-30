import { CartesianGrid, BarChart, Tooltip, Bar, XAxis, YAxis } from "recharts"
import { Card, CircularProgress, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"

export function TradingVolumeChart({ topCryptos }) {
  const theme = useTheme()
  const [chartData, setChartData] = useState(undefined)
  useEffect(() => {
    if (topCryptos) {
      setChartData(
        topCryptos
          .map((element) => {
            return { ...element, vwap24Hr: Math.round(element.vwap24Hr) }
          })
          .slice(0, 5)
      )
    }
  }, [topCryptos])

  return (
    <>
      <Card
        sx={{
          width: 600,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <Typography variant="h5">
          Volume weighted average price (24hr)
        </Typography>
        {chartData ? (
          <BarChart width={500} height={300} data={chartData}>
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
