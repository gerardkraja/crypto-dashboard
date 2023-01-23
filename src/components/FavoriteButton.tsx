import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import {FavoriteContext} from '../context/FavoriteContext'
import {useContext} from 'react'
import {IconButton} from '@mui/material'

export function FavoriteButton({cryptoID}){
const {favorites, setFavorite, unsetFavorite} = useContext(FavoriteContext)
return (
<>
{favorites && favorites.includes(cryptoID) ?
<IconButton onClick={()=>{unsetFavorite(cryptoID)}} color="error">
  <FavoriteIcon/>
</IconButton>
:
<IconButton onClick={()=>{setFavorite(cryptoID)}} color="error">
  <FavoriteBorderIcon/>
</IconButton>
}
</>
)
}
