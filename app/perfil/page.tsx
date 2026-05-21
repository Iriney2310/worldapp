'use client'

import { useEffect, useState } from "react"

export default function Perfil() {
  const [name, setName] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedName = localStorage.getItem("username")
    if (savedName) {
      setName(savedName)
      setSaved(true)
    }
  }, [])

  const saveName = () => {
    if (!name.trim()) return

    localStorage.setItem("username", name)
    setSaved(true)
  }

  return (
    <div style={{ color: "white", padding: 20, fontFamily: "sans-serif" }}>
      
      <h1>👤 Mi Perfil</h1>

      {/* SI YA HAY NOMBRE */}
      {saved ? (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            borderRadius: 12,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <p>👤 Usuario:</p>
          <h2 style={{ marginTop: 5 }}>{name}</h2>
        </div>
      ) : (
        /* SI NO HAY NOMBRE */
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
      )}
    </div>
  )
}