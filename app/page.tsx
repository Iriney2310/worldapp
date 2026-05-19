'use client'

import { useState } from 'react'

type Sneaker = {
  name: string
  rarity: 'common' | 'rare' | 'legendary'
}

const sneakers: Sneaker[] = [
  { name: 'Nike Air Force 1', rarity: 'common' },
  { name: 'Adidas Samba', rarity: 'common' },
  { name: 'Nike Dunk Low', rarity: 'rare' },
  { name: 'Jordan 1 Retro', rarity: 'rare' },
  { name: 'Yeezy Boost 350', rarity: 'legendary' },
]

function getRandomSneaker(): Sneaker {
  return sneakers[Math.floor(Math.random() * sneakers.length)]
}

export default function Home() {
  const [user, setUser] = useState<string | null>(null)
  const [points, setPoints] = useState(0)
  const [current, setCurrent] = useState<Sneaker | null>(null)
  const [collection, setCollection] = useState<Sneaker[]>([])

  const login = () => {
    setUser('user_' + Math.random().toString(36).slice(2, 8))
    setCurrent(getRandomSneaker())
  }

  const newDrop = () => {
    setCurrent(getRandomSneaker())
  }

  const claim = () => {
    if (!current) return

    setCollection([...collection, current])

    let reward = 10
    if (current.rarity === 'rare') reward = 25
    if (current.rarity === 'legendary') reward = 100

    setPoints(points + reward)

    newDrop()
  }

  const rarityColor = (rarity: string) => {
    if (rarity === 'rare') return 'orange'
    if (rarity === 'legendary') return 'gold'
    return 'white'
  }

  if (!user) {
    return (
      <main
        style={{
          minHeight: '100vh',
          background: '#0f0f0f',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <button
          onClick={login}
          style={{
            padding: 16,
            borderRadius: 12,
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          👟 Entrar a Sneaker Drop
        </button>
      </main>
    )
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #111, #222)',
        color: 'white',
        fontFamily: 'sans-serif',
        padding: 30,
      }}
    >
      <h1>👟 Sneaker Drop</h1>

      <p>Usuario: {user}</p>
      <h2>🪙 Puntos: {points}</h2>

      <hr style={{ margin: '20px 0', opacity: 0.2 }} />

      {current && (
        <div
          style={{
            padding: 20,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.05)',
          }}
        >
          <h2>🔥 Drop actual</h2>

          <h3 style={{ color: rarityColor(current.rarity) }}>
            {current.name}
          </h3>

          <p>Rareza: {current.rarity}</p>

          <button
            onClick={claim}
            style={{
              marginTop: 10,
              padding: 12,
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            🎁 Reclamar sneaker
          </button>

          <button
            onClick={newDrop}
            style={{
              marginLeft: 10,
              padding: 12,
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            🔄 Nuevo drop
          </button>
        </div>
      )}

      <hr style={{ margin: '20px 0', opacity: 0.2 }} />

      <h2>📦 Tu colección</h2>

      {collection.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Aún no tienes sneakers</p>
      ) : (
        collection.map((s, i) => (
          <div key={i}>
            👟 {s.name} ({s.rarity})
          </div>
        ))
      )}
    </main>
  )
}