import { createContext, ReactNode, useState } from "react"
import { FavoriteValues } from "../types/Favorite"

export const FavoriteContext = createContext<FavoriteValues | null>(null)

interface Props {
  children: ReactNode
}

export function FavoriteContextProvider({ children }: Props) {
  const localStorageData = localStorage.getItem("favorites")
  const [favorites, setFavorites] = useState<string[]>(
    localStorageData === null ? null : JSON.parse(localStorageData)
  )
  if (favorites === null) {
    localStorage.setItem("favorites", JSON.stringify([]))
    setFavorites([])
  }
  const setFavorite = (newFavoriteId: string) => {
    const newFavorites = [...favorites, newFavoriteId]
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
    setFavorites([...newFavorites])
  }
  const unsetFavorite = (oldFavoriteId: string) => {
    const newFavorites = [...favorites]
    const toRemoveIndex = newFavorites.findIndex(
      (favorite) => favorite === oldFavoriteId
    )
    newFavorites.splice(toRemoveIndex, 1)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
    setFavorites([...newFavorites])
  }
  return (
    <FavoriteContext.Provider value={{ favorites, setFavorite, unsetFavorite }}>
      {children && children}
    </FavoriteContext.Provider>
  )
}
