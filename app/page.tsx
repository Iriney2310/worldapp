'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [points, setPoints] = useState(0)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    const savedPoints = localStorage.getItem('points')
    const savedCooldown = localStorage.getItem('cooldown')

    if (savedPoints) setPoints(Number(savedPoints))
    if (savedCooldown) setCooldown(Number(savedCooldown))
  }, [])

  const claimPoints = () => {
    const now = Date.now()

    if (cooldown > now) return

    const newPoints = points + 10
    const nextCooldown = now + 6 * 60 * 60 * 1000

    setPoints(newPoints)
    setCooldown(nextCooldown)

    localStorage.setItem('points', String(newPoints))
    localStorage.setItem('cooldown', String(nextCooldown))
  }

  const timeLeft = () => {
    const diff = cooldown - Date.now()

    if (diff <= 0) return 'Disponible'

    const h = Math.floor(diff / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)

    return `${h}h ${m}m`
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0a0a, #111827)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif'
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: 30,
          borderRadius: 20,
          width: 320,
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}
      >
        <h1 style={{ marginBottom: 10 }}>🔥 Mi Mini App</h1>

        <p style={{ opacity: 0.7, marginBottom: 20 }}>
          Sistema de recompensas
        </p>

        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 40, margin: 0 }}>{points}</h2>
          <p style={{ opacity: 0.6 }}>Puntos acumulados</p>
        </div>

        <button
          onClick={claimPoints}
          disabled={cooldown > Date.now()}
          style={{
            marginTop: 10,
            padding: 14,
            width: '100%',
            borderRadius: 12,
            border: 'none',
            cursor: 'pointer',
            background: cooldown > Date.now() ? '#333' : '#ffffff',
            color: cooldown > Date.now() ? '#777' : '#000',
            fontWeight: 'bold',
            transition: '0.2s'
          }}
        >
          {cooldown > Date.now()
            ? `Espera ${timeLeft()}`
            : 'Reclamar +10 puntos'}
        </button>
      </div>
    </main>
  )
}