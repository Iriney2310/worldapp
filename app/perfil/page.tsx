'use client'

import { useEffect, useState } from "react"

export default function Perfil() {
  const [name, setName] = useState("")
  const [editing, setEditing] = useState(false)
  const [input, setInput] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("username")
    if (saved) {
      setName(saved)
      setInput(saved)
    } else {
      setEditing(true)
    }
  }, [])

  const saveName = () => {
    if (!input.trim()) return

    localStorage.setItem("username", input)
    setName(input)
    setEditing(false)
  }

  return (
    <div style={{ color: "white", padding: 20, fontFamily: "sans-serif" }}>
      
      <h1>👤 Mi Perfil</h1>

      {/* USUARIO */}
      <div
        style={{
          marginTop: 20,
          padding: 15,
          borderRadius: 12,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <p style={{ margin: 0 }}>
          👤 Usuario:{" "}
          <b>{name || "Invitado"}</b>
        </p>

        {/* LAPIZ */}
        <span
          onClick={() => setEditing(true)}
          style={{
            cursor: "pointer",
            fontSize: 18
          }}
        >
          ✏️
        </span>
      </div>

      {/* EDITAR NOMBRE */}
      {editing && (
        <div style={{ marginTop: 15 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu nombre"
            onKeyDown={(e) => {
              if (e.key === "Enter") saveName()
            }}
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
            💾 Guardar
          </button>
        </div>
      )}
    </div>
  )
}