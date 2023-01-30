import { Typography, CircularProgress, Pagination } from "@mui/material"
import { useState } from "react"

import { CryptoListItem } from "../../components/CryptoListItem"
import { useFetchSearchResults } from "../../hooks/useFetchSearchResults"

//TODO: if search returns no results or there are no favorites show something
export function SearchResults() {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, nrPages] = useFetchSearchResults()
  return (
    <>
      <Typography>Search</Typography>
      {!data && <CircularProgress />}
      {data &&
        data.slice((currentPage - 1) * 20, currentPage * 20).map((crypto) => {
          return <CryptoListItem key={crypto.id} cryptoInfo={crypto} />
        })}
      <Pagination
        count={nrPages}
        page={currentPage}
        onChange={(e, value) => {
          setCurrentPage(value)
        }}
      />
    </>
  )
}
