'use client'

import { accessories } from '../../data/accessories'
import { useParams } from 'next/navigation'
import type { CSSProperties } from 'react'

export default function AccessoryDetail() {
  const params = useParams()
  const id = Number(params.id)

  const item = accessories.find((a) => a.id === id)

  if (!item) {
    return <p style={{ padding: 20 }}>Accesorio no encontrado</p>
  }

  return (
    <main style={main}>

      <button
        onClick={() => window.location.href = '/accessories'}
        style={backBtn}
      >
        ← Volver
      </button>

      <h1
  style={{
    marginTop: 5,
    fontSize: 25,
    fontWeight: 900,

    textAlign: 'center',

    background:
      'linear-gradient(90deg, var(--text), rgba(255,255,255,0.6))',

    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    letterSpacing: '-1px',
  }}
>
  {item.name}
</h1>

      <img src={item.image} style={img} />

      <p><b>Marca:</b> {item.brand}</p>

      <p style={{ fontWeight: 'bold', fontSize: 20 }}>
        €{item.price}
      </p>

      <button
        onClick={() => window.open(item.link, '_blank')}
        style={btn}
      >
        🛒 Comprar
      </button>

    </main>
  )
}

/* STYLES */

const main: CSSProperties = {
  padding: 20,
  color: 'var(--text)',
}

const title: CSSProperties = {
  textAlign: 'center',
  marginBottom: 20,
}

const img: CSSProperties = {
  width: '100%',
  maxWidth: 400,
  display: 'block',
  margin: '0 auto',
  borderRadius: 16,
}

const btn: CSSProperties = {
  width: '100%',
  padding: 12,
  marginTop: 20,
  borderRadius: 12,
  border: 'none',
  background: 'linear-gradient(90deg,#ff00cc,#3333ff)',
  color: 'white',
  fontWeight: 'bold',
}

const backBtn: CSSProperties = {
  marginBottom: 20,
  padding: 10,
  borderRadius: 10,
  border: '1px solid var(--border)',
  background: 'var(--card)',
  color: 'var(--text)',
}