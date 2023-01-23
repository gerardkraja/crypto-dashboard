import {CartesianGrid, ResponsiveContainer, BarChart,
Tooltip, Bar, XAxis, YAxis } from 'recharts'
import {Card} from '@mui/material'

export function TradingVolumeChart({topCryptos}){
return(
<>
{topCryptos ?
<ResponsiveContainer width="90%" height="50%">
<Card>
<BarChart
width={500}
height={300}
data={topCryptos}
>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey={'symbol'}/>
<YAxis domain={['dataMin', 'dataMax']}/>
<Bar dataKey='volumeUsd24Hr' stroke='#8884d8'/>
<Tooltip/>
</BarChart>
</Card>
</ResponsiveContainer>
:
<CircularProgress/>}
</>
)
}
