import {useLoaderData} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {CartesianGrid, ResponsiveContainer, LineChart,
Tooltip, Line, XAxis, YAxis } from 'recharts'
import {CircularProgress, ToggleButton, ToggleButtonGroup, Card, Typography} from '@mui/material'

import {FavoriteButton} from '../../components/FavoriteButton'

export async function loader(params){
const responses = await Promise.all([
fetch(`https://api.coincap.io/v2/exchanges?`
+ new URLSearchParams({id: params.exchangeID
})),
fetch(`https://api.coincap.io/v2/exchanges?`
+ new URLSearchParams({id: params.exchangeID
})),
])
const exchangeInfo = await responses[0].json()
const chartData = await responses[1].json()
return {exchangeInfo, chartData}
}

export default function ExchangeDetails(){
const {exchangeInfo, chartData} = useLoaderData()

return (
<div style={{height: '100vh', width: '100vw'}}>
<Card>
{exchangeInfo ?
<>
<Typography>
{exchangeInfo.name}
</Typography>
<Typography>
{exchangeInfo.rank}
</Typography>
<Typography>
{exchangeInfo.tradingPairs}
</Typography>
<Typography>
{exchangeInfo.volumeUsd}
</Typography>
<Typography>
{exchangeInfo.exchangeUrl}
</Typography>
</>
:
<CircularProgress/>
}
</Card>
{chartData ?
<ResponsiveContainer width="90%" height="50%">
<Card>
<PieChart
width={500}
height={300}
data={chartData}
>
<Tooltip/>
</LineChart>
<ToggleButtonGroup
  color="primary"
  value={chartIndex}
  exclusive
  onChange={(e,newValue)=>setChartIndex(newValue)}
  aria-label="Platform"
>
  <ToggleButton
disabled={chartIndex === 'day'}
value="day">1D</ToggleButton>
  <ToggleButton
disabled={chartIndex === 'week'}
 value="week">1W</ToggleButton>
  <ToggleButton
disabled={chartIndex === 'month'}
value="month">1M</ToggleButton>
  <ToggleButton
disabled={chartIndex === 'year'}
value="year">1Y</ToggleButton>
</ToggleButtonGroup>
</Card>
</ResponsiveContainer>
:
<CircularProgress/>}
</div>
)
}
