import {useLoaderData} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {CartesianGrid, ResponsiveContainer, LineChart,
Tooltip, Line, XAxis, YAxis } from 'recharts'
import {CircularProgress, ToggleButton, ToggleButtonGroup, Card, Typography} from '@mui/material'

import {ExchangeChart} from '../../components/ExchangeChart'
import {FavoriteButton} from '../../components/FavoriteButton'

export async function loader(params){
const responses = await Promise.all([
fetch(`https://api.coincap.io/v2/exchanges/${params.params.exchangeID}`),
fetch(`https://api.coincap.io/v2/exchanges?`
+ new URLSearchParams({limit: 5
})),
])
const exchangeInfo = (await responses[0].json()).data
const chartData = (await responses[1].json()).data
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
<Card>
<ExchangeChart data={chartData}/>
</Card>
:
<CircularProgress/>}
</div>
)
}
