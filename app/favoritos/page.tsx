'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Sneaker = {
  id: number
  name: string
  brand: string
  price: string
  image: string
  link: string
}

export default function Favoritos() {
  const [favorites, setFavorites] = useState<Sneaker[]>([])
  const [selected, setSelected] = useState<Sneaker | null>(null)
  const router = useRouter()

  // cargar favoritos
  useEffect(() => {
    const loadFavorites = () => {
      const data = localStorage.getItem("favorites")
      setFavorites(data ? JSON.parse(data) : [])
    }

    loadFavorites()
    window.addEventListener("storage", loadFavorites)

    return () => window.removeEventListener("storage", loadFavorites)
  }, [])

  const removeFavorite = (shoe: Sneaker) => {
    const updated = favorites.filter((item) => item.id !== shoe.id)
    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

  return (
    <div
      style={{
        color: "var(--text)",
        background: "var(--bg)",
        minHeight: "100vh",
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
              onClick={() => setSelected(shoe)}
              style={{
                background: "var(--card)",
                padding: 10,
                borderRadius: 14,
                border: "1px solid var(--border)",
                color: "var(--text)",
                cursor: "pointer",
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
                onClick={(e) => {
                  e.stopPropagation()
                  removeFavorite(shoe)
                }}
                style={{
                  marginTop: 8,
                  width: "100%",
                  padding: 6,
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  color: "var(--text)",
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