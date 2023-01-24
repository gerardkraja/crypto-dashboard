import styles from './CryptoListItem.module.css'
import Card from '@mui/material/Card';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Link} from 'react-router-dom'

import {FavoriteButton} from './FavoriteButton'

export function ExchangeListItem({exchangeInfo}){
return(
<>
<Link key={exchangeInfo.exchangeId} to={`/exchangeDetails/${exchangeInfo.exchangeId}`}>
<Typography>
{exchangeInfo.name}
</Typography>
</Link>
<Typography>
{exchangeInfo.rank}
</Typography>
<Typography>
{Math.round(exchangeInfo.volumeUsd)}
</Typography>
</>
)
}
