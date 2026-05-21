'use client'

import { useEffect, useState } from "react"

export default function Favoritos() {
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    const data = localStorage.getItem("favorites")
    if (data) {
      setFavorites(JSON.parse(data))
    }
  }, [])

  return (
    <div style={{ color: 'white', padding: 20 }}>
      <h1>❤️ Favoritos</h1>

      {favorites.length === 0 ? (
        <p>No tienes zapatillas guardadas</p>
      ) : (
        favorites.map((id) => (
          <div
            key={id}
            style={{
              padding: 10,
              marginTop: 10,
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            👟 Zapatilla ID: {id}
          </div>
        ))
      )}
    </div>
  )
}