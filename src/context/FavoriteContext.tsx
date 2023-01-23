import {createContext, useState} from 'react'

export const FavoriteContext = createContext(null)

export function FavoriteContextProvider({children}){
const [favorites, setFavorites] = useState(
JSON.parse(localStorage.getItem('favorites')))
if(favorites === null){
localStorage.setItem('favorites',JSON.stringify([]))
setFavorites([])
}
const setFavorite = (newFavorite) => {
const newFavorites = [...favorites, newFavorite]
localStorage.setItem('favorites', JSON.stringify(newFavorites))
setFavorites([...newFavorites])
}
const unsetFavorite = (oldFavorite) => {
const newFavorites = [...favorites]
newFavorites.splice(newFavorites.findIndex(
favorite=>{favorite === oldFavorite}), 1)
console.log('old faves ' + favorites)
console.log('new faves ' + newFavorites)
localStorage.setItem('favorites', JSON.stringify(newFavorites))
setFavorites([...newFavorites])
}
return(
<FavoriteContext.Provider value={{favorites, setFavorite, unsetFavorite}}>
{children && children}
</FavoriteContext.Provider>
)
}
