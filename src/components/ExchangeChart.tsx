import { Card, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, Legend } from "recharts"

//TODO: replace with 6 colors from the mui theme colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  //  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  //  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const x = cx + 2.5 * radius * Math.cos(-midAngle * RADIAN)
  const y = cy + 2.5 * radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} textAnchor={"middle"} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}
export function ExchangeChart({ data }) {
  const [chartData, setChartData] = useState()
  useEffect(() => {
    if (data) {
      //Change data precision
      const processedData = data
        .map((exchange) => {
          return {
            ...exchange,
            percentTotalVolume: parseInt(
              parseFloat(exchange.percentTotalVolume).toFixed(1)
            ),
          }
        })
        .slice(0, 5)
      //Add an item to the data that represents the rest of the exchanges
      let restPercentVolume = 0
      processedData.forEach(
        (item) => (restPercentVolume += parseFloat(item.percentTotalVolume))
      )
      processedData.push({
        percentTotalVolume: Math.round(100.0 - restPercentVolume),
        name: "Others",
      })
      setChartData([...processedData])
    }
  }, [data])

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5">Total volume for top exchanges.</Typography>
      {chartData ? (
        <PieChart width={400} height={350}>
          <Pie
            data={chartData}
            cx={200}
            cy={150}
            label={renderCustomizedLabel}
            outerRadius={110}
            fill="#8884d8"
            dataKey="percentTotalVolume"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      ) : (
        <CircularProgress />
      )}
    </Card>
  )
}
