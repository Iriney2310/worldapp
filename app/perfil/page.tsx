'use client'

import { useEffect, useState } from "react"

type Sneaker = {
  id: number
  name: string
  brand: string
  price: string
  image: string
}

export default function Perfil() {
  const [favorites, setFavorites] = useState<Sneaker[]>([])
  const [name, setName] = useState("")

  // 🔄 cargar datos al entrar
  useEffect(() => {
    const favData = localStorage.getItem("favorites")
    if (favData) setFavorites(JSON.parse(favData))

    const savedName = localStorage.getItem("username")
    if (savedName) setName(savedName)
  }, [])

  // 💾 guardar nombre
  const saveName = () => {
    localStorage.setItem("username", name)
  }

  return (
    <div
      style={{
        color: "white",
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: 28 }}>👤 Mi Perfil</h1>

      {/* TARJETA PERFIL */}
      <div
        style={{
          marginTop: 20,
          padding: 15,
          borderRadius: 12,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <p>
          👤 Usuario:{" "}
          <b>{name.trim() ? name : "Invitado"}</b>
        </p>

        <p style={{ marginTop: 8 }}>
          ❤️ Favoritos: <b>{favorites.length}</b>
        </p>
      </div>

      {/* EDITAR NOMBRE */}
      <div style={{ marginTop: 20 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Escribe tu nombre"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            border: "1px solid white",
            background: "transparent",
            color: "white",
            outline: "none",
          }}
        />

        <button
          onClick={saveName}
          style={{
            marginTop: 10,
            width: "100%",
            padding: 10,
            borderRadius: 10,
            border: "1px solid white",
            background: "linear-gradient(90deg,#ff00cc,#3333ff)",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          💾 Guardar nombre
        </button>
      </div>

      {/* BOTÓN FAVORITOS */}
      <button
        onClick={() => (window.location.href = "/favoritos")}
        style={{
          marginTop: 20,
          width: "100%",
          padding: 12,
          borderRadius: 10,
          border: "1px solid white",
          background: "transparent",
          color: "white",
          cursor: "pointer",
        }}
      >
        ❤️ Ver favoritos
      </button>
    </div>
  )
}