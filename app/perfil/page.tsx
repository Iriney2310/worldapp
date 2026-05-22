'use client'

import { useEffect, useState } from "react"

export default function Perfil() {
  const [name, setName] = useState("")
  const [editing, setEditing] = useState(false)
  const [input, setInput] = useState("")
    const [copied, setCopied] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("username")
    if (saved) {
      setName(saved)
      setInput(saved)
    } else {
      setEditing(true)
    }
  }, [])

const toggleTheme = () => {
  const body = document.getElementById("app-body")

  const isLight = body?.classList.contains("light")

  if (isLight) {
    body?.classList.remove("light")
    localStorage.setItem("theme", "dark")
  } else {
    body?.classList.add("light")
    localStorage.setItem("theme", "light")
  }
}
<button onClick={toggleTheme}>
  Cambiar tema
</button>

useEffect(() => {
  const saved = localStorage.getItem("theme")

  if (saved === "light") {
    setDarkMode(false)
  }
}, []) 

  const saveName = () => {
    if (!input.trim()) return

    localStorage.setItem("username", input)
    setName(input)
    setEditing(false)
  }
  const [darkMode, setDarkMode] = useState(true)

  // 🧠 inicial del usuario
  const avatarLetter = name?.trim()?.charAt(0).toUpperCase() || "?"

  return (
  <div>
    <button onClick={toggleTheme}>
      Cambiar tema
    </button>
  </div>
)
  return (
    <div
    
  style={{
    color: darkMode ? "white" : "black",
    background: darkMode ? "#000" : "#f2f2f2",
    padding: 20,
    minHeight: "100vh",
    fontFamily: "sans-serif",
  }}
>

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

<button
  onClick={() => {
    const newMode = !darkMode

    setDarkMode(newMode)

    localStorage.setItem(
      "theme",
      newMode ? "dark" : "light"
    )
  }}
  style={{
    marginTop: 20,
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "1px solid white",
    background: "linear-gradient(90deg,#ff00cc,#3333ff)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  {darkMode ? "☀️ Modo claro" : "🌙 Modo oscuro"}
</button>

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
  onClick={async () => {
    const email = "irineymm@gmail.com"

    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error(err)
    }
  }}
  style={{
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid white",
    background: copied
      ? "linear-gradient(90deg,#00ff99,#00cc66)"
      : "linear-gradient(90deg,#ff00cc,#3333ff)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.2s ease"
  }}
>
  {copied ? "✔ Email copiado" : "📋 Copiar email"}
</button>
</div>
    </div>
  )
}
