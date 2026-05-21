'use client'

import { useEffect, useState } from "react"

export default function Favoritos() {
  const [favorites, setFavorites] = useState<any[]>([])

  useEffect(() => {
    const data = localStorage.getItem("favorites")
    if (data) setFavorites(JSON.parse(data))
  }, [])

  return (
    <div style={{ color: "white", padding: 20 }}>
      <h1>❤️ Favoritos</h1>

      {favorites.length === 0 ? (
        <p>No tienes zapatillas</p>
      ) : (
        favorites.map((shoe) => (
          <div
            key={shoe.id}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              marginTop: 10,
              padding: 10,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 10,
            }}
          >
            <img src={shoe.image} style={{ width: 60, borderRadius: 8 }} />

            <div>
              <p style={{ margin: 0 }}>{shoe.name}</p>
              <p style={{ margin: 0, opacity: 0.7 }}>{shoe.price}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}