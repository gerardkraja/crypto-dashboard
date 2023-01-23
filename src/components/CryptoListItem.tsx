import styles from './CryptoListItem.module.css'
import Card from '@mui/material/Card';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {FavoriteButton} from './FavoriteButton'

export function CryptoListItem({crypto, isFavoriteEnabled}){
return(
<Link key={crypto.id} to={`/cryptoDetails/${crypto.id}`}>
<div className={styles.cryptoButton}>
<div className={styles.cryptoRank}>
<Typography>
{crypto.rank}
</Typography>
</div>
<div className={styles.cryptoName}>
<Typography>
{crypto.name}
</Typography>
<Typography>
{`(${crypto.symbol})`}
</Typography>
</div>
<div className={styles.cryptoPrice}>
   <Typography>
{`$${parseFloat(crypto.priceUsd).toFixed(2)}`}
</Typography>
</div>
<div className={styles.cryptoChange}>
{isFavoriteEnabled &&
<FavoriteButton cryptoID={crypto.id}/>
}
{crypto.changePercent24Hr > 0 ?
<ArrowDropUpIcon color='success'/>
:
<ArrowDropDownIcon color='error'/>
}
<Typography>
{parseFloat(crypto.changePercent24Hr).toFixed(2)}
</Typography>
</div>
</div>
</Link>
)
}
