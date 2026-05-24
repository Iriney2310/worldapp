'use client'

import { useEffect, useState } from "react"
import { useCurrency } from "../context/CurrencyContext"
import { useTheme } from "../context/ThemeContext"

export default function Perfil() {
  const { dark, toggleTheme } = useTheme()
  const { currency, setCurrency } = useCurrency()

  const [name, setName] = useState("")
  const [editing, setEditing] = useState(false)
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("username")

    if (savedUser) {
      setName(savedUser)
      setInput(savedUser)
    } else {
      setEditing(true)
    }
  }, [])

  const saveName = (newName: string) => {
    if (!newName.trim()) return
    localStorage.setItem("username", newName)
    setName(newName)
    setEditing(false)
  }

  const avatarLetter = name?.trim()?.charAt(0).toUpperCase() || "?"

  return (
    <div style={{
      color: "var(--text)",
      background: "var(--bg)",
      minHeight: "100vh",
      padding: 20,
      fontFamily: "sans-serif",
    }}>

{/* USUARIO */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: 15,
    borderRadius: 12,
    background: "var(--card)",
    border: "1px solid var(--border)",
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
      color: "white",
      flexShrink: 0,
    }}
  >
    {avatarLetter}
  </div>

  {/* INFO */}
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <p style={{ margin: 0 }}>
      Usuario: <b>{name || "Invitado"}</b>
    </p>

    <span
      onClick={() => {
        setInput(name || "")
        setEditing(true)
      }}
      style={{
        cursor: "pointer",
        userSelect: "none",
        fontSize: 16,
      }}
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
        border: "1px solid var(--border)",
        background: "var(--card)",
        color: "var(--text)",
        outline: "none",
      }}
    />

    <button
      onClick={() => {
        if (!input.trim()) return

        saveName(input.trim())
        setEditing(false)
      }}
      style={{
        marginTop: 10,
        width: "100%",
        padding: 10,
        borderRadius: 10,
        background: "linear-gradient(90deg,#ff00cc,#3333ff)",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        border: "none",
      }}
    >
      💾 Guardar
    </button>
  </div>
)}

<div
  style={{
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    background: 'var(--card)',
    border: '1px solid var(--border)',
    textAlign: 'center',
    fontSize: 15,
    opacity: 0.9,
  }}
>
  🆕 ¡Actualizamos la app cada día con nuevas zapatillas y accesorios! Vuelve para ver novedades.✨  
</div>

      {/* 💰 SELECTOR DE MONEDA */}
      <div style={{
        marginTop: 20,
        padding: 15,
        borderRadius: 12,
        background: "var(--card)",
        border: "1px solid var(--border)"
      }}>
        <h3>💰 Moneda</h3>

        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button onClick={() => setCurrency("EUR")}>
            EUR €
          </button>

          <button onClick={() => setCurrency("USD")}>
            USD $
          </button>

          <button onClick={() => setCurrency("ARS")}>
            ARS $
          </button>
        </div>

        <p style={{ marginTop: 10, opacity: 0.7 }}>
          Actual: <b>{currency}</b>
        </p>
      </div>

      {/* BOTÓN TEMA */}
      <button
        onClick={toggleTheme}
        style={{
          marginTop: 20,
          width: "100%",
          padding: 12,
          borderRadius: 12,
          background: "var(--card)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        {dark ? "☀️ Modo claro" : "🌙 Modo oscuro"}
      </button>

{/* TELEGRAM */}
<div
  style={{
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    background: "var(--card)",
    border: "1px solid var(--border)",
    textAlign: "center",
    color: "var(--text)",
  }}
>
  <h3>📢 Canal de Telegram</h3>

  <button
    onClick={() =>
      window.location.href = "https://t.me/sneakersworldapp"
    }
    style={{
      marginTop: 10,
      padding: "10px 14px",
      borderRadius: 10,
      background: "linear-gradient(90deg,#0088cc,#00c6ff)",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      border: "none",
    }}
  >
    🚀 Ir al canal
  </button>
</div>

      {/* CONTACTO */}
      <div style={{
        marginTop: 20,
        padding: 15,
        borderRadius: 12,
        background: "var(--card)",
        border: "1px solid var(--border)",
        textAlign: "center",
        color: "var(--text)"
      }}>
        <h3>📩 Contáctanos</h3>

        <p style={{ opacity: 0.8 }}>
          sneakersworldapp@gmail.com
        </p>

        <button
          onClick={async () => {
            await navigator.clipboard.writeText("sneakersworldapp@gmail.com")
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
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {copied ? "✔ Email copiado" : "📋 Copiar email"}
        </button>
      </div>

    </div>
  )
}