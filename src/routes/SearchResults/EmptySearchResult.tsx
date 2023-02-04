import { Typography } from "@mui/material"
import { useParams } from "react-router-dom"

export const EmptySearchResult = () => {
  const params = useParams()
  const search = params.search as string
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "60%",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" color="GrayText">
        No results
      </Typography>
      <Typography color="GrayText">
        {`Your search for "${search}" returned no results`}
      </Typography>
    </div>
  )
}
