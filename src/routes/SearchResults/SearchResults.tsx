import {useLoaderData, useParams} from 'react-router-dom'
import {Typography, CircularProgress, Pagination} from '@mui/material'
import {useState} from 'react'

import {CryptoFilter} from '../../components/CryptoFilter.tsx'
import {CryptoListItem} from '../../components/CryptoListItem.tsx'
import {ExchangeListItem} from '../../components/ExchangeListItem.tsx'

//TODO: if search returns no results or there are no favorites show something
export async function loader({params}){
const search = params.search
const response = await fetch('https://api.coincap.io/v2/assets?'
+ new URLSearchParams({search: search}))
const data = (await response.json()).data 
return data
}

export function SearchResults(){
const [currentPage, setCurrentPage] = useState(1)
const data = useLoaderData()
const [filteredData, setFilteredData] = useState([...data])
const nrPages = Math.ceil(data.length / 10.0)
const pageNumbers = []
for(let i=1;i<=nrPages;i++){
pageNumbers.push(i)
}
return(
<>
<Typography>
Search
</Typography>
<CryptoFilter
data={filteredData}
setData={setFilteredData}
/>
{!data && <CircularProgress/>}
{data &&
data.slice((currentPage - 1) * 10, currentPage * 10).map(crypto=>{
return <CryptoListItem key={crypto.id} cryptoInfo={crypto}/>
})
}
<Pagination count={nrPages} page={currentPage} onChange={
(e, value)=>{setCurrentPage(value)}}/>
</>
)
}
