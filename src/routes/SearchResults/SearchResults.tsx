import { Typography, CircularProgress, Pagination } from "@mui/material"
import { useState } from "react"

import { CryptoListItem } from "../../components/CryptoListItem/CryptoListItem"
import { useFetchSearchResults } from "../../hooks/useFetchSearchResults"
import styles from "./SearchResults.module.css"
import { EmptySearchResult } from "./EmptySearchResult"

export function SearchResults() {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, nrPages] = useFetchSearchResults()
  return (
    <div className={styles.page}>
      <div className={styles.resultsContainer}>
        <Typography variant="h4" className={styles.title}>
          Search
        </Typography>
        {!data && <CircularProgress />}
        {data?.length !== 0 ? (
          data
            ?.slice((currentPage - 1) * 20, currentPage * 20)
            .map((crypto) => {
              return <CryptoListItem key={crypto.id} cryptoInfo={crypto} />
            })
        ) : (
          <EmptySearchResult />
        )}
      </div>
      <Pagination
        className={styles.pagination}
        count={nrPages}
        page={currentPage}
        onChange={(e, value) => {
          setCurrentPage(value)
        }}
      />
    </div>
  )
}
