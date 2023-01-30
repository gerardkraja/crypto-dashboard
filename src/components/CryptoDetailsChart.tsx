import {
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Tooltip,
  Line,
  XAxis,
  YAxis,
} from "recharts"

export function CryptoDetailsChart({ chartInfo, chartIndex }) {
  return (
    <LineChart width={600} height={400} data={chartInfo[chartIndex]}>
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
