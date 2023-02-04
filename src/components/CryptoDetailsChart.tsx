import { CartesianGrid, LineChart, Tooltip, Line, XAxis, YAxis } from "recharts"
import { ChartDataResult } from "../types/Crypto"

interface Props {
  chartInfo: ChartDataResult
  chartIndex: string
}

export function CryptoDetailsChart({ chartInfo, chartIndex }: Props) {
  const isMobile = window.innerWidth < 768
  return (
    <LineChart
      width={isMobile ? 280 : 600}
      height={550}
      data={chartInfo[chartIndex]}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={"date"} />
      <YAxis
        domain={["dataMin", "dataMax"]}
        padding={{ top: 20, bottom: 20 }}
        allowDecimals={false}
        tickCount={6}
        tickLine={false}
        tickMargin={-5}
      />
      <Line dataKey="priceUsd" stroke="#8884d8" dot={false} />
      <Tooltip />
    </LineChart>
  )
}
