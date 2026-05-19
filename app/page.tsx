'use client'

import { useState } from 'react'

export default function Home() {
  const [user, setUser] = useState<string | null>(null)

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#111',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          width: 320,
          background: 'rgba(255,255,255,0.05)',
          padding: 20,
          borderRadius: 12,
          textAlign: 'center',
        }}
      >
        <h1>🔥 Mi App</h1>

        {!user ? (
          <>
            <p>Login demo</p>

            <button
              onClick={() => setUser('user_' + Math.random().toString(36).slice(2, 8))}
              style={{
                padding: 12,
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Entrar
            </button>
          </>
        ) : (
          <>
            <p>✔ Logueado</p>
            <p style={{ fontSize: 12 }}>{user}</p>

            <button
              onClick={() => setUser(null)}
              style={{
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Salir
            </button>
          </>
        )}
      </div>
    </main>
  )
}