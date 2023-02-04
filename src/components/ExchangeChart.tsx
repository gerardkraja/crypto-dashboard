import { Card, CircularProgress, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, Legend } from "recharts"
import { ExchangeApiItem, ExchangeChartData } from "../types/Exchange"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]
const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + 2.5 * radius * Math.cos(-midAngle * RADIAN)
  const y = cy + 2.5 * radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      textAnchor={"middle"}
      dominantBaseline="central"
      style={{ fill: "grey" }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

interface Props {
  data: ExchangeApiItem[] | undefined
}

export function ExchangeChart({ data }: Props) {
  const [chartData, setChartData] = useState<ExchangeChartData[] | undefined>(
    undefined
  )
  const theme = useTheme()
  useEffect(() => {
    if (data) {
      //Change data precision
      const processedData: ExchangeChartData[] = data
        .map((exchange) => {
          return {
            percentTotalVolume: parseInt(
              parseFloat(exchange.percentTotalVolume).toFixed(1)
            ),
            name: exchange.name,
          }
        })
        .slice(0, 5)
      //Add an item to the data that represents the rest of the exchanges
      let restPercentVolume = 0
      processedData.forEach(
        (item) =>
          (restPercentVolume += parseFloat(item.percentTotalVolume.toString()))
      )
      processedData.push({
        percentTotalVolume: Math.round(100.0 - restPercentVolume),
        name: "Others",
      })
      setChartData([...processedData])
    }
  }, [data])
  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "0.5rem",
        }}
      >
        <Typography sx={{ textAlign: "center" }} variant="h5">
          Total volume for top exchanges.
        </Typography>
        {chartData ? (
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              cx={200}
              cy={170}
              label={renderCustomizedLabel}
              outerRadius={130}
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
    </>
  )
}
