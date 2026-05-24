'use client'

import { useFavorites } from '/app/context/FavoritesContext'
import { accessories } from '/app/data/accessories'
import type { CSSProperties } from 'react'

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites()

  const favItems = accessories.filter(item =>
    favorites.includes(item.id)
  )

  return (
    <main style={main}>
      <h1 style={title}>❤️ FAVORITOS</h1>

      {favItems.length === 0 ? (
        <p style={{ textAlign: 'center', opacity: 0.7 }}>
          No tienes favoritos aún
        </p>
      ) : (
        <div style={grid}>
          {favItems.map(item => (
            <div key={item.id} style={card}>
              
              {/* BOTÓN QUITAR */}
              <button
                onClick={() => toggleFavorite(item.id)}
                style={removeBtn}
              >
                ✖ Quitar
              </button>

              <img src={item.image} style={img} />

              <h3>{item.name}</h3>
              <p>{item.brand}</p>

              <p style={{ fontWeight: 'bold' }}>
                €{item.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

const main: CSSProperties = {
  minHeight: '100vh',
  padding: 20,
  color: 'var(--text)',
  background: 'var(--bg)',
}

const title: CSSProperties = {
  textAlign: 'center',
  marginBottom: 20,
}

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
  gap: 16,
}

const card: CSSProperties = {
  position: 'relative',
  background: 'var(--card)',
  border: '2px solid #ff3b7a',   // 👈 BORDE FAVORITOS
  padding: 12,
  borderRadius: 20,
  overflow: 'hidden',
}

const img: CSSProperties = {
  width: '100%',
  aspectRatio: '1 / 1',
  objectFit: 'cover',
  borderRadius: 12,
}

const removeBtn: CSSProperties = {
  position: 'absolute',
  top: 10,
  right: 10,
  background: '#ff3b7a',
  color: 'white',
  border: 'none',
  padding: '6px 10px',
  borderRadius: 10,
  cursor: 'pointer',
  fontWeight: 'bold',
}