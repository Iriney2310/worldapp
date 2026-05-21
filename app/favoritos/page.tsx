'use client'

import { useEffect, useState } from "react"

export default function Favoritos() {
  const [favorites, setFavorites] = useState<any[]>([])

  useEffect(() => {
    try {
      const data = localStorage.getItem("favorites")
      if (data) {
        setFavorites(JSON.parse(data))
      }
    } catch (e) {
      setFavorites([])
    }
  }, [])

  return (
    <div style={{ color: "white", padding: 20 }}>
      <h1>❤️ Favoritos</h1>

      {favorites.length === 0 ? (
        <p>No tienes zapatillas guardadas</p>
      ) : (
        favorites.map((shoe) => (
          <div key={shoe.id}>
            👟 {shoe.name}
          </div>
        ))
      )}
    </div>
  )
}