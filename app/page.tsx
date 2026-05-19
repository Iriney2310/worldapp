'use client'

import { useState } from 'react'

export default function Home() {
  const [user, setUser] = useState<any>(null)

  const login = () => {
    // Simulación temporal del login World ID
    const fakeUser = {
      nullifier_hash: 'demo_user_123456789',
    }

    setUser(fakeUser)
  }

  return (
    <main style={{ padding: 40, color: 'white', background: '#111', minHeight: '100vh' }}>
      <h1>🔥 Mi Mini App</h1>

      {!user ? (
        <>
          <p>Login con World ID (modo demo)</p>

          <button
            onClick={login}
            style={{
              padding: 14,
              borderRadius: 10,
              border: 'none',
              background: 'white',
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            Entrar
          </button>
        </>
      ) : (
        <>
          <p>✔ Usuario logueado</p>
          <p>ID: {user.nullifier_hash}</p>
        </>
      )}
    </main>
  )
}