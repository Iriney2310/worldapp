'use client'

import { accessories } from '../data/accessories'
import type { CSSProperties } from 'react'

export default function AccessoriesPage() {
  return (
    <main style={main}>
      <h1 style={title}>🧢 ACCESORIOS</h1>

      <div style={grid}>
        {accessories.map((item) => (
          <div key={item.id} style={card}>
            <img src={item.image} style={img} />

            <h3>{item.name}</h3>

            <p>{item.brand}</p>

            <p style={{ fontWeight: 'bold' }}>
              €{item.price}
            </p>

            <button
              onClick={() => window.open(item.link, '_blank')}
              style={btn}
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}

const main: CSSProperties = {
  padding: 20,
  color: 'var(--text)',
}

const title: CSSProperties = {
  textAlign: 'center',
  marginBottom: 30,
}

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
  gap: 16,
}

const card: CSSProperties = {
  background: 'var(--card)',
  padding: 12,
  borderRadius: 20,
}

const img: CSSProperties = {
  width: '100%',
  aspectRatio: '1 / 1',
  objectFit: 'cover',
  borderRadius: 12,
}

const btn: CSSProperties = {
  width: '100%',
  padding: 10,
  borderRadius: 10,
  border: 'none',
  marginTop: 10,
}