'use client'

import { useState } from 'react'
import WorldIDLogin from './components/WorldIDLogin'

export default function Home() {
  const [user, setUser] = useState<any>(null)

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
        padding: 40,
      }}
    >
      <div
        style={{
          width: 320,
          background: 'rgba(255,255,255,0.05)',
          padding: 30,
          borderRadius: 16,
          textAlign: 'center',
        }}
      >
        <h1>🔥 Mi Mini App</h1>

        {!user ? (
          <>
            <p style={{ opacity: 0.7 }}>Login con World ID</p>

            <WorldIDLogin onSuccess={(result: any) => setUser(result)} />
          </>
        ) : (
          <>
            <p style={{ color: 'lightgreen' }}>
              ✔ Usuario logueado
            </p>

            <p style={{ fontSize: 12, opacity: 0.7 }}>
              ID: {user?.nullifier_hash || 'sin id'}
            </p>

            <button
              onClick={() => setUser(null)}
              style={{
                marginTop: 15,
                padding: 10,
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </main>
  )
}