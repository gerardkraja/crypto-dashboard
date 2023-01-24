import styles from './Home.module.css'
import Card from '@mui/material/Card';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Link} from 'react-router-dom'

import {CryptoListItem} from './CryptoListItem'
import {ExchangeListItem} from './ExchangeListItem'

export function InfoList({type, data}){
const options = {
cryptos: {
title: 'Top cryptocurrencies',
link: '/more/cryptos'
},
favorites: {
title: 'Favorites',
link: '/more/favorites'
},
exchanges: {
title: 'Top exchanges',
link: '/more/exchanges'
},
}
return(
<Card>
<Typography>
{options[type]['title']}
</Typography>
{!data && <CircularProgress/>}
{data && type === 'cryptos' &&
data.map(crypto=>
<CryptoListItem key={crypto.id} cryptoInfo={crypto}/>
)
}
{data && type === 'favorites' &&
data.map(favorite=>
<CryptoListItem key={favorite.id} cryptoInfo={favorite} isFavoriteEnabled={true}/>
)
}
{data && type === 'exchanges' &&
data.map(exchange=>
<ExchangeListItem key={exchange.exchangeId} exchangeInfo={exchange}/>
)
}
<Link to={options[type]['link']}>
<Typography>
Show more
</Typography>
</Link>
</Card>

)
}
