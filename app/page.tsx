'use client'

import { useState } from 'react'
import WorldIDLogin from './components/WorldIDLogin'

export default function Home() {
  const [user, setUser] = useState<any>(null)

  return (
    <main style={{ padding: 40, color: 'white', background: '#111', minHeight: '100vh' }}>
      <h1>🔥 Mi Mini App</h1>

      {!user ? (
        <>
          <p>Login con World ID real</p>

          <WorldIDLogin onSuccess={(result: any) => setUser(result)} />
        </>
      ) : (
        <>
          <p>✔ Usuario verificado con World ID</p>
          <p>ID: {user?.nullifier_hash?.slice(0, 12)}</p>
        </>
      )}
    </main>
  )
}