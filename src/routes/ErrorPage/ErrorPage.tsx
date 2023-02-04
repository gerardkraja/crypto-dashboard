import { isRouteErrorResponse, useRouteError } from "react-router-dom"
import { Typography } from "@mui/material"
import styles from "./ErrorPage.module.css"

export default function ErrorPage() {
  const error = useRouteError() as any
  let errorMessage
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText
  } else {
    errorMessage = error.message
  }
  return (
    <div className={styles.pageWrap}>
      <div className={styles.card}>
        <Typography variant="h1">Oops!</Typography>
        <Typography variant="h4" color="grey">
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography variant="h6">{errorMessage}</Typography>
      </div>
    </div>
  )
}
