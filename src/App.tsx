import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import {useState} from 'react'

import {FavoriteContextProvider} from './context/FavoriteContext'
import {Layout} from './components/Layout'
import './App.css'
import ErrorPage from './ErrorPage'
import Home, {loader as homeLoader} from './routes/Home/Home.tsx'
import CryptoDetails from './routes/CryptoDetails/CryptoDetails.tsx'
import ExchangeDetails, {loader as exchangeDetailsLoader} from './routes/ExchangeDetails/ExchangeDetails.tsx'
import {MoreItems, loader as moreItemsLoader} from './routes/MoreItems/MoreItems.tsx'

//TODO: main container can be expanded horizontally if you
//provider big enough content. Prevent it.
//TODO: store in local storage the preferred theme
export default function App(){
const storedMode = localStorage.getItem('mode')
if(storedMode === null) localStorage.setItem('mode', 'light')
const [mode, setMode] = useState<'light' | 'dark'>(
storedMode === null ? 'light' : storedMode
);
const toggleColorMode = () => {
setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
}
const storeMode =(newMode)=>{
setMode(newMode)
localStorage.setItem('mode', newMode)
}
const theme = createTheme({
      palette: {
        mode,
        },
      })
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout mode={mode} setMode={storeMode}/>,
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
},
{
path: 'exchangeDetails/:exchangeID',
element: <ExchangeDetails
/>,
loader: exchangeDetailsLoader
},
{
path: 'more/:pageType',
element: <MoreItems
/>,
loader: moreItemsLoader
},
]);
return(
<ThemeProvider theme={theme}>
<FavoriteContextProvider>
<RouterProvider router={router}/>
</FavoriteContextProvider>
</ThemeProvider>
)}
