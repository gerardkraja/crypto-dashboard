import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {CartesianGrid, ResponsiveContainer, LineChart,
Tooltip, Line, XAxis, YAxis } from 'recharts'
import {CircularProgress, ToggleButton, ToggleButtonGroup, Card, Typography} from '@mui/material'

import {FavoriteButton} from '../../components/FavoriteButton'

const weekInMs = 604800000
const monthInMs = 2592000000
const yearInMs = 31536000000
const requestStart = Date.now()

//TODO: move the graph in a separate component
export default function CryptoDetails(){
const {cryptoID} = useParams()
const [cryptoInfo, setCryptoInfo] = useState(undefined)
const [chartInfo, setChartInfo] = useState(undefined)
const [chartIndex, setChartIndex] = useState('day')
//TODO: pull this out in a separate hook
useEffect(()=>{
async function preprocessChart(apiResponse){
const jsonData = await apiResponse.json()
const data = jsonData.data.map(dataItem=>{return {
...dataItem,
priceUsd: parseFloat(dataItem.priceUsd).toFixed(2),
date: dataItem.date.substring(0,10)
}})
return data
}
//TODO: disable xaxis on mobile
//TODO: try to reduce the number of points in the graph and see if it feels faster
async function fetchCryptoInfo(){
const cryptoInfoData = await fetch(`https://api.coincap.io/v2/assets/${cryptoID}`)
const cryptoInfoJson = await cryptoInfoData.json()
setCryptoInfo(cryptoInfoJson.data)
const chartData = await Promise.all([
fetch(`https://api.coincap.io/v2/assets/${cryptoID}/history?`
+ new URLSearchParams({interval: "m15",
start: requestStart - weekInMs,
end: requestStart
})),
fetch(`https://api.coincap.io/v2/assets/${cryptoID}/history?`
+ new URLSearchParams({interval: "h1",
start: requestStart - monthInMs,
end: requestStart
})),
fetch(`https://api.coincap.io/v2/assets/${cryptoID}/history?`
+ new URLSearchParams({interval: "d1",
start: requestStart - yearInMs,
end: requestStart
})),
])
const chartDataResult = {}
chartDataResult.week = await preprocessChart(chartData[0])
chartDataResult.day = chartDataResult.week.slice(0,97).map(info=>{return {...info, date: info.date.substring(11,16)}})
chartDataResult.month = await preprocessChart(chartData[1])
chartDataResult.year = await preprocessChart(chartData[2])
setChartInfo({...chartDataResult})
}
fetchCryptoInfo()
},[])
return (
<div style={{height: '100vh', width: '100vw'}}>
<Card>
{cryptoInfo ?
<>
<Typography>
{cryptoInfo.name}
</Typography>
<Typography>
{cryptoInfo.priceUsd}
</Typography>
<Typography>
{cryptoInfo.changePercent24Hr}
</Typography>
<FavoriteButton cryptoID={cryptoID} />
</>
:
<CircularProgress/>
}
</Card>
{chartInfo ?
<ResponsiveContainer width="90%" height="50%">
<Card>
<LineChart
width={500}
height={300}
data={chartInfo[chartIndex]}
>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey={'date'} minTickGap={chartInfo[chartIndex].length / 2}/>
<YAxis domain={['dataMin', 'dataMax']} padding={{ top: 20, bottom: 20 }} />
<Line dataKey='priceUsd' stroke='#8884d8' dot={false}/>
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

