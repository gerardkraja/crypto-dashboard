import {useLoaderData, useParams} from 'react-router-dom'
import {Typography, CircularProgress, Pagination} from '@mui/material'
import {useState} from 'react'

import {CryptoListItem} from '../../components/CryptoListItem.tsx'
import {ExchangeListItem} from '../../components/ExchangeListItem.tsx'

//TODO: if search returns no results or there are no favorites show something
export async function loader({params}){
const pageType = params.pageType
let data
if(pageType === 'cryptos'){
const response = await fetch('https://api.coincap.io/v2/assets') 
data = (await response.json()).data 
}else if(pageType === 'favorites'){
const favorites = JSON.parse(localStorage.getItem('favorites'))
const response = await fetch('https://api.coincap.io/v2/assets?'
+ new URLSearchParams({ids: favorites}))
data = (await response.json()).data 
}else if(pageType === 'exchanges'){
const response = await fetch('https://api.coincap.io/v2/exchanges')
data = (await response.json()).data 
}
return data
}

export function MoreItems(){
const [currentPage, setCurrentPage] = useState(1)
const data = useLoaderData()
const {pageType} = useParams()
const options ={
cryptos:{
title: 'Cryptocurrencies',
listComponent: <CryptoListItem cryptoInfo={data}/>
},
favorites:{
title: 'Favorites',
listComponent: <CryptoListItem isFavoriteEnabled={true} cryptoInfo={data}/>
},
exchanges:{
title: 'Exchanges',
listComponent: <CryptoListItem cryptoInfo={data}/>
},
}
const nrPages = Math.ceil(data.length / 10.0)
const pageNumbers = []
for(let i=1;i<=nrPages;i++){
pageNumbers.push(i)
}
return(
<>
<Typography>
{options[pageType]['title']}
</Typography>
{!data && <CircularProgress/>}
{data && pageType === 'cryptos' &&
data.slice((currentPage - 1) * 10, currentPage * 10).map(crypto=>{
return <CryptoListItem key={crypto.id} cryptoInfo={crypto}/>
})
}
{data && pageType === 'favorites' &&
data.slice((currentPage - 1) * 10, currentPage * 10).map(favorite=>{
return <CryptoListItem key={favorite.id} isFavoriteEnabled={true} cryptoInfo={favorite}/>
})
}
{data && pageType === 'exchanges' &&
data.slice((currentPage - 1) * 10, currentPage * 10).map(exchange=>{
return <ExchangeListItem key={exchange.exchangeId} exchangeInfo={exchange}/>
})
}
<Pagination count={nrPages} page={currentPage} onChange={
(e, value)=>{setCurrentPage(value)}}/>
</>
)
}
