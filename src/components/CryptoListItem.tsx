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

export function CryptoListItem({cryptoInfo, isFavoriteEnabled}){
return(
<div className={styles.cryptoButton}>
<div className={styles.cryptoRank}>
<Typography>
{cryptoInfo.rank}
</Typography>
</div>
<Link to={`/cryptoDetails/${cryptoInfo.id}`}>
<div className={styles.cryptoName}>
<Typography>
{cryptoInfo.name}
</Typography>
<Typography>
{`(${cryptoInfo.symbol})`}
</Typography>
</div>
</Link>
<div className={styles.cryptoPrice}>
   <Typography>
{`$${parseFloat(cryptoInfo.priceUsd).toFixed(2)}`}
</Typography>
</div>
<div className={styles.cryptoChange}>
{isFavoriteEnabled === true &&
<FavoriteButton cryptoID={cryptoInfo.id}/>
}
{cryptoInfo.changePercent24Hr > 0 ?
<ArrowDropUpIcon color='success'/>
:
<ArrowDropDownIcon color='error'/>
}
<Typography>
{parseFloat(cryptoInfo.changePercent24Hr).toFixed(2)}
</Typography>
</div>
</div>
)
}
