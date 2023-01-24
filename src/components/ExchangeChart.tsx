import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
console.log(percent)
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${percent}%`}
    </text>
  );
};

export function ExchangeChart({data}){
//Change data precision
const processedData = data.map(exchange=>{
return {...exchange, percentTotalVolume: parseFloat(
exchange.percentTotalVolume).toFixed(0)}
})
//Add an item to the data that represents the rest of the exchanges
let restPercentVolume = 0
processedData.forEach(item=>restPercentVolume += parseFloat(item.percentTotalVolume))
processedData.push({percentTotalVolume: parseFloat(100.0 - restPercentVolume).toFixed(0),
name: 'Others'})
console.log(processedData)
return(
<PieChart width={400} height={400}>
      <Pie
        data={processedData}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="percentTotalVolume"
      >
        {processedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
)}

