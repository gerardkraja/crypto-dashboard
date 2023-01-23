import styles from './Home.module.css'
import Card from '@mui/material/Card';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Link} from 'react-router-dom'
imoort {CryptoListItem} from './CryptoListItem'
imoort {ExchangeListItem} from './ExchangeListItem'

export function InfoList({type, data}){
const details = {
cryptos: {
title: 'Top cryptocurrencies',
link: ''
},
favorites: {
title: 'Favorites',
link: ''
},
exchanges: {
title: 'Top exchanges',
link: ''
},

}
return(
<Card>
<Typography>
{details[type]['title']}
</Typography>
{!data && <CircularProgress/>}
{data && type === 'cryptos'?
data.map(crypto=>
<CryptoListItem cryptoInfo={crypto}/>
)
}
{data && type === 'favorites'?
data.map(favorite=>
<CryptoListItem cryptoInfo={crypto} isFavoriteEnabled/>
)
}
{data && type === 'exchanges'?
data.map(exchange=>
<ExchangeListItem exchangeInfo={exchange}/>
)
}
<Button color='primary' onClick={()=>{}}>
More
</Button>
</Card>
)

}
