'use client'

import { useState } from 'react'
import { accessories } from '../data/accessories'
import type { CSSProperties } from 'react'
import { useCurrency } from '../context/CurrencyContext'
import { useFavorites } from '../context/FavoritesContext'

export default function AccessoriesPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  const [openBrands, setOpenBrands] = useState(false)
  const [openStores, setOpenStores] = useState(false)

  const [brand, setBrand] = useState<'all' | 'Nike' | 'Adidas'>('all')
  const [store, setStore] = useState<'all' | 'Amazon' | 'MercadoLibre'>('all')
  const [search, setSearch] = useState('')

  const { convert } = useCurrency()

  /* ================= FAVORITOS (CONTEXTO) ================= */
  const { favorites, toggleFavorite } = useFavorites()

  /* ================= FILTRO ================= */
  const filtered = accessories.filter((item) => {
    const matchBrand = brand === 'all' || item.brand === brand
    const matchStore = store === 'all' || item.store === store
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())

    return matchBrand && matchStore && matchSearch
  })

  return (
    <main style={main}>

      {/* TOP FAVORITOS */}
    <button
  onClick={() => (window.location.href = '/accessories/favorites')}
  style={favBtn}
>
  ❤️ {favorites.length}
</button>

      {/* TOP BAR */}
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <button onClick={() => setMenuOpen(true)} style={topLeftBtn}>
          ☰
        </button>

        <h1 style={title}>🧢 ACCESORIOS</h1>
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={overlay} />
      )}

      {/* SIDEBAR */}
      <div
        style={{
          ...sidebar,
          transform: menuOpen ? 'translateX(0)' : 'translateX(-110%)',
          transition: '0.35s cubic-bezier(0.2,0.8,0.2,1)',
        }}
      >
        <button onClick={() => setMenuOpen(false)} style={sideBtn}>
          ✕ Cerrar
        </button>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔎 Buscar..."
          style={input}
        />

        {/* MARCAS */}
        <button onClick={() => setOpenBrands(!openBrands)} style={sideBtn}>
          👟 MARCAS {openBrands ? '▲' : '▼'}
        </button>

        {openBrands && (
          <div style={{ marginLeft: 10 }}>
            <button onClick={() => setBrand('all')} style={sideBtn}>Todas</button>
            <button onClick={() => setBrand('Nike')} style={sideBtn}>Nike</button>
            <button onClick={() => setBrand('Adidas')} style={sideBtn}>Adidas</button>
          </div>
        )}

        {/* TIENDAS */}
        <button onClick={() => setOpenStores(!openStores)} style={sideBtn}>
          🛒 TIENDAS {openStores ? '▲' : '▼'}
        </button>

        {openStores && (
          <div style={{ marginLeft: 10 }}>
            <button onClick={() => setStore('all')} style={sideBtn}>Todas</button>
            <button onClick={() => setStore('Amazon')} style={sideBtn}>Amazon</button>
            <button onClick={() => setStore('MercadoLibre')} style={sideBtn}>Mercado Libre</button>
          </div>
        )}

        <button
          onClick={() => (window.location.href = '/')}
          style={sideBtn}
        >
          👟 SNEAKERS
        </button>
      </div>

      {/* GRID */}
      <div style={grid}>
        {filtered.map((item) => (
          <div
            key={item.id}
            style={card}
            onClick={() =>
              (window.location.href = `/accessories/${item.id}`)
            }
          >
            {/* ❤️ FAVORITO */}
            <div
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(item.id)
              }}
              style={heart}
            >
              {favorites.includes(item.id) ? '❤️' : '🤍'}
            </div>

            <img src={item.image} style={img} />

            <h3>{item.name}</h3>
            <p>{item.brand}</p>

            <p style={{ fontWeight: 'bold' }}>
              {convert(item.price)}
            </p>
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
  cursor: 'pointer',
  transition: '0.25s ease',
  position: 'relative',
}

const img: CSSProperties = {
  width: '100%',
  aspectRatio: '1 / 1',
  objectFit: 'cover',
  borderRadius: 12,
}

const heart: CSSProperties = {
  position: 'absolute',
  top: 10,
  right: 10,
  cursor: 'pointer',
  fontSize: 18,
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

const input: CSSProperties = {
  width: '100%',
  padding: 10,
  marginTop: 10,
  borderRadius: 8,
  border: '1px solid var(--border)',
  background: 'var(--card)',
  color: 'var(--text)',
}

const overlay: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.3)',
  zIndex: 9998,
}

const favBtn: CSSProperties = {
  position: 'absolute',
  top: 10,
  right: 10,

  background: 'var(--card)',
  color: 'var(--text)',

  border: '1px solid var(--border)',
  borderRadius: 12,

  padding: '8px 14px',

  cursor: 'pointer',
  fontWeight: 'bold',
  zIndex: 20,
}