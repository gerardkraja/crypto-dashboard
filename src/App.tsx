import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import {useState} from 'react'

import {FavoriteContextProvider} from './context/FavoriteContext'
import {Layout} from './components/Layout'
import './App.css'
import ErrorPage from './ErrorPage'
import Home, {loader as homeLoader} from './routes/Home/Home.tsx'
import CryptoDetails from './routes/CryptoDetails/CryptoDetails.tsx'

//TODO: main container can be expanded horizontally if you
//provider big enough content. Prevent it.
//TODO: store in local storage the preferred theme
export default function App(){
const [mode, setMode] = useState<'light' | 'dark'>('light');
const toggleColorMode = () => {
setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
}
const theme = createTheme({
      palette: {
        mode,
        },
      })
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout mode={mode} setMode={setMode}/>,
    errorElement: <ErrorPage />,
  },
{
path: 'home',
loader: homeLoader,
element: <Home/>
},
{
path: 'cryptoDetails/:cryptoID',
element: <CryptoDetails
/>
}
]);
return(
<ThemeProvider theme={theme}>
<FavoriteContextProvider>
<RouterProvider router={router}/>
</FavoriteContextProvider>
</ThemeProvider>
)}
