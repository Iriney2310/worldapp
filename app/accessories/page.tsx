'use client'

import { useState } from 'react'
import { accessories } from '../data/accessories'
import type { CSSProperties } from 'react'

export default function AccessoriesPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main style={main}>

      {/* TOP BAR */}
      <div style={{ textAlign: 'center', position: 'relative' }}>
        
        <button
          onClick={() => setMenuOpen(true)}
          style={topLeftBtn}
        >
          ☰
        </button>

        <h1 style={title}>🧢 ACCESORIOS</h1>
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={overlay}
        />
      )}

      {/* SIDEBAR */}
      <div
        style={{
          ...sidebar,
          transform: menuOpen
            ? 'translateX(0)'
            : 'translateX(-110%)',
          transition: '0.35s cubic-bezier(0.2,0.8,0.2,1)',
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          style={sideBtn}
        >
          ✕ Cerrar
        </button>

        <button
          onClick={() => {
            window.location.href = '/'
          }}
          style={sideBtn}
        >
          👟 Sneakers
        </button>
      </div>

      {/* GRID */}
      <div style={grid}>
        {accessories.map((item) => (
          <div key={item.id} style={card}>

            <img
              src={item.image}
              style={img}
            />

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

/* ================= STYLES ================= */

const main: CSSProperties = {
  minHeight: '100vh',
  padding: 20,
  color: 'var(--text)',
  background: 'var(--bg)',
}

const title: CSSProperties = {
  textAlign: 'center',
  marginBottom: 30,
  marginTop: 10,
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
  border: '1px solid var(--border)',
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
  background: 'linear-gradient(90deg,#ff00cc,#3333ff)',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
}

const topLeftBtn: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  background: 'var(--card)',
  color: 'var(--text)',
  border: '1px solid var(--border)',
  padding: '4px 14px',
  fontSize: 20,
  borderRadius: 8,
  cursor: 'pointer',
}

const sidebar: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: 280,
  height: '100%',
  background: 'var(--bg)',
  padding: 20,
  zIndex: 9999,
  borderRight: '1px solid var(--border)',
}

const sideBtn: CSSProperties = {
  display: 'block',
  marginTop: 10,
  padding: 10,
  width: '100%',
  borderRadius: 10,
  border: '1px solid var(--border)',
  background: 'var(--card)',
  color: 'var(--text)',
  cursor: 'pointer',
}

const overlay: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.3)',
  zIndex: 9998,
}