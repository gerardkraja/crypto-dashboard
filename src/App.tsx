import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider, createTheme, PaletteMode } from "@mui/material"
import { useMemo, useState } from "react"

import { FavoriteContextProvider } from "./context/FavoriteContext"
import { Layout } from "./components/Layout"
import "./App.css"
import ErrorPage from "./routes/ErrorPage/ErrorPage"
import Home from "./routes/Home/Home"
import CryptoDetails from "./routes/CryptoDetails/CryptoDetails"
import ExchangeDetails from "./routes/ExchangeDetails/ExchangeDetails"
import { MoreItems } from "./routes/MoreItems/MoreItems"
import { SearchResults } from "./routes/SearchResults/SearchResults"
import { Contact } from "./routes/Contact/Contact"

export default function App() {
  const storedMode = localStorage.getItem("mode") as PaletteMode
  if (storedMode === null) localStorage.setItem("mode", "light")
  const [mode, setMode] = useState<PaletteMode>(
    storedMode === null ? "light" : storedMode
  )
  const storeMode = (newMode: PaletteMode) => {
    setMode((prevMode: PaletteMode) =>
      prevMode === "light" ? "dark" : "light"
    )
    if (newMode !== null) localStorage.setItem("mode", newMode)
  }
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          button: {
            textTransform: "none",
          },
        },
      }),
    [mode]
  )
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout mode={mode} setMode={storeMode} />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "cryptoDetails/:cryptoID",
          element: <CryptoDetails />,
        },
        {
          path: "exchangeDetails/:exchangeID",
          element: <ExchangeDetails />,
        },
        {
          path: "more/:pageType",
          element: <MoreItems />,
        },
        {
          path: "search/:search",
          element: <SearchResults />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
  ])
  return (
    <ThemeProvider theme={theme}>
      <FavoriteContextProvider>
        <RouterProvider router={router} />
      </FavoriteContextProvider>
    </ThemeProvider>
  )
}
