'use client'

import { useEffect, useState } from "react"

export default function Page() {

  const [favorites, setFavorites] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("favorites") || "[]")
    }
    return []
  })

  // 💾 Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  // 🔄 Re-sincronizar al volver a la página
  useEffect(() => {
    const handleFocus = () => {
      const data = localStorage.getItem("favorites")
      if (data) setFavorites(JSON.parse(data))
    }

    window.addEventListener("focus", handleFocus)

    return () => window.removeEventListener("focus", handleFocus)
  }, [])

  // ❤️ Toggle favorito
  const toggleFavorite = (shoe: any) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === shoe.id)

      let updated

      if (exists) {
        updated = prev.filter((item) => item.id !== shoe.id)
      } else {
        updated = [...prev, shoe]
      }

      localStorage.setItem("favorites", JSON.stringify(updated))
      return updated
    })
  }

  return (
    <main>
      {/* EJEMPLO BOTÓN ❤️ EN TARJETA */}
      {/* Cambia esto dentro de tu map */}
      {/*
        <button onClick={(e) => {
          e.stopPropagation()
          toggleFavorite(s)
        }}>
          {favorites.some((item) => item.id === s.id) ? "❤️" : "🤍"}
        </button>
      */}
    </main>
  )
}