import styles from './Home.module.css'
import { useLoaderData} from 'react-router-dom'

import {InfoList} from '../../components/InfoList'
import {TradingVolumeChart} from './TradingVolumeChart'

export async function loader(){
const storedFavorites = JSON.parse(localStorage.getItem('favorites'))
//if you pass null to the ids parameter for the favorites 
//you get back an empty array
const favorites = storedFavorites.length === 0 ? null : storedFavorites
const responses = await Promise.all([
fetch('https://api.coincap.io/v2/assets?'
+ new URLSearchParams({limit: 10})),
fetch('https://api.coincap.io/v2/assets?'
+ new URLSearchParams({limit: 10, ids: favorites })),
fetch('https://api.coincap.io/v2/exchanges?'
+ new URLSearchParams({limit: 10})),
])
const jsonData = await Promise.all([
responses[0].json(),
responses[1].json(),
responses[2].json(),
])
const cryptoData = jsonData[0].data
const favoriteData = jsonData[1].data
//Remove extra unnecessary data field
const exchangeData = jsonData[2].data.slice(0,11)
return {cryptoData, favoriteData, exchangeData}
}

export default function Home(){
//TODO: add dark mode toggle
//TODO: validate incoming data with zod
const {cryptoData, favoriteData, exchangeData} = useLoaderData()
return(
<div className={styles.container}>
<TradingVolumeChart topCryptos={cryptoData}/>
<InfoList type='cryptos' data={cryptoData}/>
<InfoList type='favorites' data={favoriteData}/>
<InfoList type='exchanges' data={exchangeData}/>
</div>
)
}
