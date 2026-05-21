'use client'

import { useEffect, useState } from "react"

type Sneaker = {
  id: number
  name: string
  brand: string
  price: string
  image: string
}

export default function Favoritos() {
  const [favorites, setFavorites] = useState<Sneaker[]>([])

  // 🔄 Cargar favoritos al entrar + sincronizar
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const data = localStorage.getItem("favorites")
        if (data) {
          setFavorites(JSON.parse(data))
        } else {
          setFavorites([])
        }
      } catch (e) {
        setFavorites([])
      }
    }

    loadFavorites()

    // 🔥 sincronización entre pestañas
    window.addEventListener("storage", loadFavorites)

    return () => {
      window.removeEventListener("storage", loadFavorites)
    }
  }, [])

  // ❌ quitar favorito
  const removeFavorite = (shoe: Sneaker) => {
    const updated = favorites.filter((item) => item.id !== shoe.id)
    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

  return (
    <div
      style={{
        color: "white",
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: 28 }}>❤️ Favoritos</h1>

      {favorites.length === 0 ? (
        <p style={{ opacity: 0.6, marginTop: 10 }}>
          No tienes zapatillas guardadas
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
            marginTop: 20,
          }}
        >
          {favorites.map((shoe) => (
            <div
              key={shoe.id}
              style={{
                background: "rgba(255,255,255,0.06)",
                padding: 10,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <img
                src={shoe.image}
                style={{
                  width: "100%",
                  borderRadius: 10,
                }}
              />

              <h3 style={{ fontSize: 14, marginTop: 8 }}>
                {shoe.name}
              </h3>

              <p style={{ opacity: 0.7, fontSize: 12 }}>
                {shoe.brand}
              </p>

              <p style={{ fontWeight: "bold", marginTop: 4 }}>
                {shoe.price}
              </p>

              <button
                onClick={() => removeFavorite(shoe)}
                style={{
                  marginTop: 8,
                  width: "100%",
                  padding: 6,
                  borderRadius: 8,
                  border: "1px solid white",
                  background: "transparent",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}