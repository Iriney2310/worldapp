'use client'

import { useEffect, useState } from "react"
import { useTheme } from "../context/ThemeContext"

export default function Perfil() {
  const { dark, toggleTheme } = useTheme()
  const [name, setName] = useState("")
  const [editing, setEditing] = useState(false)
  const [input, setInput] = useState("")
  const [darkMode, setDarkMode] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("username")
    if (savedUser) {
      setName(savedUser)
      setInput(savedUser)
    } else {
      setEditing(true)
    }

    const theme = localStorage.getItem("theme")
    if (theme === "light") {
      setDarkMode(false)
    }
  }, [])

  const saveName = () => {
    if (!input.trim()) return
    localStorage.setItem("username", input)
    setName(input)
    setEditing(false)
  }

  const avatarLetter = name?.trim()?.charAt(0).toUpperCase() || "?"

  return (
    <div
      style={{
        color: darkMode ? "white" : "black",
        background: darkMode ? "#000" : "#f2f2f2",
        minHeight: "100vh",
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
{/* 🔥 BOTÓN DE TEMA */}
<button
  onClick={toggleTheme}
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
  {dark ? "🌙 Modo oscuro" : "☀️ Modo claro"}
</button>

      {/* USUARIO */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: 15,
        borderRadius: 12,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)"
      }}>
        <div style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          background: "linear-gradient(90deg,#ff00cc,#3333ff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold"
        }}>
          {avatarLetter}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <p style={{ margin: 0 }}>
            Usuario: <b>{name || "Invitado"}</b>
          </p>

          <span
            onClick={() => setEditing(true)}
            style={{ cursor: "pointer" }}
          >
            ✏️
          </span>
        </div>
      </div>

      {/* EDITAR NOMBRE */}
      {editing && (
        <div style={{ marginTop: 15 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu nombre"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 10,
              border: "1px solid white",
              background: "transparent",
              color: "white"
            }}
          />

          <button
            onClick={saveName}
            style={{
              marginTop: 10,
              width: "100%",
              padding: 10,
              borderRadius: 10,
              background: "linear-gradient(90deg,#ff00cc,#3333ff)",
              color: "white",
              fontWeight: "bold"
            }}
          >
            💾 Guardar
          </button>
        </div>
      )}

      {/* TEMA */}
      <button
        onClick={toggleTheme}
        style={{
          marginTop: 20,
          width: "100%",
          padding: 12,
          borderRadius: 12,
          background: "linear-gradient(90deg,#ff00cc,#3333ff)",
          color: "white",
          fontWeight: "bold"
        }}
      >
        {darkMode ? "☀️ Modo claro" : "🌙 Modo oscuro"}
      </button>

      {/* CONTACTO */}
      <div style={{
        marginTop: 40,
        padding: 15,
        borderRadius: 12,
        background: "rgba(255,255,255,0.06)",
        textAlign: "center"
      }}>
        <h3>📩 Contáctanos</h3>

        <p style={{ opacity: 0.8 }}>
          irineymm@gmail.com
        </p>

        <button
          onClick={async () => {
            await navigator.clipboard.writeText("irineymm@gmail.com")
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            background: copied
              ? "linear-gradient(90deg,#00ff99,#00cc66)"
              : "linear-gradient(90deg,#ff00cc,#3333ff)",
            color: "white",
            fontWeight: "bold"
          }}
        >
          {copied ? "✔ Email copiado" : "📋 Copiar email"}
        </button>
      </div>
    </div>
  )
}