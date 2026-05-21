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

  // 🧠 inicial del usuario
  const avatarLetter = name?.trim()?.charAt(0).toUpperCase() || "?"

  return (
    <div style={{ color: "white", padding: 20, fontFamily: "sans-serif" }}>

      {/* TARJETA USUARIO */}
      <div
        style={{
          marginTop: 20,
          padding: 15,
          borderRadius: 12,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          gap: 12
        }}
      >
        {/* AVATAR */}
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "linear-gradient(90deg,#ff00cc,#3333ff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 18,
            flexShrink: 0
          }}
        >
          {avatarLetter}
        </div>

        {/* TEXTO + LÁPIZ */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <p style={{ margin: 0 }}>
                Usuario: <b>{name || "Invitado"}</b>
            </p>

            {/* LÁPIZ MÁS PEGADO */}
            <span
              onClick={() => setEditing(true)}
              style={{
                cursor: "pointer",
                fontSize: 16,
                opacity: 0.8
              }}
            >
              ✏️
            </span>
          </div>
        </div>
      </div>

      {/* EDITAR */}
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
      {/* CONTACTO */}
<div
  style={{
    marginTop: 40,
    padding: 15,
    borderRadius: 12,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    textAlign: "center"
  }}
>
  <h3 style={{ marginBottom: 10 }}>📩 Contáctanos</h3>

  <p style={{ opacity: 0.8, marginBottom: 12 }}>
    irineymm@gmail.com
  </p>

  <button
  onClick={() => {
    const email = "irineymm@gmail.com"

    const subject = "Soporte Sneakers"
    const body = "Hola, necesito ayuda con Sneakers."

    const mailtoLink =
      `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.location.href = mailtoLink
  }}
  style={{
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid white",
    background: "linear-gradient(90deg,#ff00cc,#3333ff)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  📧 Enviar email
</button>
</div>
    </div>
  )
}