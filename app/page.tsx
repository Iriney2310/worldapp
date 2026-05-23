'use client'

import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCurrency } from './context/CurrencyContext'
import { sneakers, type Sneaker } from './data/sneakers'
import Sidebar from './componentes/Sidebar'

export default function Home() {
  const { currency, convert } = useCurrency()
  const [selected, setSelected] = useState<Sneaker | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [favOpen, setFavOpen] = useState(false)
  const [openBrands, setOpenBrands] = useState(false)
  const [store, setStore] = useState<'all' | 'Amazon' | 'MercadoLibre'>('all')
  const [openStores, setOpenStores] = useState(false)
  const [brand, setBrand] = useState<'all' | 'Nike' | 'Adidas'>('all')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState<Sneaker[]>([])
  const [closing, setClosing] = useState(false)
  const [mounted, setMounted] = useState(false)

const searchParams = typeof window !== 'undefined'
  ? useSearchParams()
  : null

useEffect(() => {
  if (!mounted || !searchParams) return

  const id = searchParams.get("id")

  if (id) {
    const shoe = sneakers.find(s => s.id === Number(id))
    if (shoe) setSelected(shoe)
  }
}, [mounted, searchParams])

useEffect(() => {
  const data = localStorage.getItem('favorites')

  if (data) {
    setFavorites(JSON.parse(data))
  }
}, [])

useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}, [favorites])

  const filtered = useMemo(() => {
  return sneakers.filter(s => {
    const matchBrand = brand === 'all' || s.brand === brand

    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.brand.toLowerCase().includes(search.toLowerCase())

    const matchStore = store === 'all' || s.store === store

    return matchBrand && matchSearch && matchStore
  })
}, [brand, search, store])

  const toggleFavorite = (shoe: Sneaker) => {
  setFavorites(prev => {
    const exists = prev.some(item => item.id === shoe.id)

    const updated = exists
      ? prev.filter(item => item.id !== shoe.id)
      : [...prev, shoe]

    return updated
  })
}

  const favItems = sneakers.filter(s => favorites.some(fav => fav.id === s.id))

  const closeDetail = () => {
    setClosing(true)
    setTimeout(() => {
      setSelected(null)
      setClosing(false)
    }, 80)
  }

  return (
    <main style={main}>
<div style={overlayBg} />
{/* BANNER */}
{!selected && (
  <div style={banner}>
    ¡SNEAKERS!
  </div>
)}
      {/* TOP BAR */}
      {!selected && (
        <div style={{ textAlign: 'center' }}>
          
          <p style={{ opacity: 0.8, marginTop: 15 }}>
            ¡TUS SNEAKERS AL MEJOR PRECIO!
          </p>

          <button onClick={() => setMenuOpen(true)} style={topLeftBtn}>
            ☰
          </button>
        </div>
      )}

      {/* OVERLAY */}
      {(menuOpen || favOpen) && (
        <div
          onClick={() => {
            setMenuOpen(false)
            setFavOpen(false)
          }}
          style={{
            ...overlay,
            opacity: 1,
            transition: '0.25s ease',
          }}
        />
      )}

<Sidebar
  menuOpen={menuOpen}
  setMenuOpen={setMenuOpen}
  search={search}
  setSearch={setSearch}
  brand={brand}
  setBrand={setBrand}
  store={store}
  setStore={setStore}
  openBrands={openBrands}
  setOpenBrands={setOpenBrands}
  openStores={openStores}
  setOpenStores={setOpenStores}
  goHome={() => (window.location.href = '/')}
  goAccessories={() => {
    window.location.href = '/accessories'
    setMenuOpen(false)
  }}
/>

          {/* GRID */}
{!selected && (
  <div style={grid}>
    {filtered.map((s) => (
      <div
        key={s.id}
        style={card}
        onMouseEnter={(e) => {
       e.currentTarget.style.transform = 'translateY(-12px) scale(1.06)'
       e.currentTarget.style.boxShadow = '0 30px 70px rgba(0,0,0,0.7)'
      e.currentTarget.style.transition = '0.25s ease'
      }}
        onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)'
     e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)'
      }}
        onClick={() => setSelected(s)}
      >
        {s.badge && <div style={badge}>{s.badge}</div>}

        <div
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(s)
            e.currentTarget.parentElement!.style.transform = 'translateY(0) scale(1)'
          }}
          style={heart}
        >
          {favorites.some(fav => fav.id === s.id) ? '❤️' : '🤍'}
        </div>
{s.tags?.map((tag: string, i: number) => (
  <span
    key={i}
    style={{
      position: 'absolute',
      top: 8,
      left: 60 + i * 60,
      fontSize: 10,
      padding: '3px 8px',
      borderRadius: 6,
      background: tag.includes('%')
        ? '#ff3b30'
        : '#111',
      color: 'white',
      fontWeight: 'bold',
      border: '1px solid rgba(255,255,255,0.2)',
    }}
  >
    {tag}
  </span>
))}
        <div style={imgContainer}>
  <img src={s.image} style={img} />
</div>
<div
  style={{
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: '50%',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  }}
>
  <img
    src={
      s.store === 'Amazon'
        ? 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
        : 'https://www.elcohetealaluna.com/wp-content/uploads/2019/07/Mercado-Libre..png'
    }
    style={{
      width: '100%',
      height: "100%",
      objectFit: 'contain',
    }}
  />
</div>

        <h3>{s.name}</h3>
        <p>{s.brand}</p>
        <div style={{ marginTop: 6 }}>
  {/* precio actual */}
<p style={{ fontWeight: 'bold', fontSize: 16 }}>
  <p style={{ fontWeight: 'bold', fontSize: 16 }}>
  {convert(Number(s.price))}
</p>
</p>
  {/* precio antiguo si existe */}
  {s.oldPrice && (
    <p
      style={{
        textDecoration: 'line-through',
        fontSize: 12,
        opacity: 0.7,
        marginTop: -4,
      }}
    >
      {s.oldPrice}
    </p>
  )}
</div>
      </div>
    ))}
  </div>
)}

{/* DETAIL */}
{selected && (
  <div
    style={{
      ...detail,
      opacity: closing ? 0 : 1,
      transform: closing
        ? 'translateY(10px) scale(0.98)'
        : 'translateY(0) scale(1)',
      transition: '0.15s ease',
    }}
  >
    {/* BOTÓN VOLVER */}
    <button onClick={closeDetail} style={backBtn}>
      ← Volver
    </button>

{/* TITULO */}
<h2
  style={{
    marginTop: 40,
    fontSize: 34,
    fontWeight: 900,
    letterSpacing: '-0.8px',
    textAlign: 'center',

    // base legible SIEMPRE
    color: 'var(--text)',

    // efecto premium suave
    textShadow:
      '0 1px 0 rgba(255,255,255,0.05), 0 10px 30px rgba(0,0,0,0.25)',

    // pequeño “lift” visual
    transform: 'translateZ(0)',
  }}
>
  {selected.name}
</h2>

    {/* IMAGEN */}
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src={selected.image}
        style={{
          width: 360,
          borderRadius: 18,
          objectFit: 'contain',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        }}
      />
    </div>

    {/* INFO */}
<div style={{ marginTop: 22, textAlign: 'center' }}>
  
  <p style={{ fontSize: 16, opacity: 0.8 }}>
    Marca: <b>{selected.brand}</b>
  </p>

  <p style={{ fontSize: 20, marginTop: 8 }}>
  Precio: <b>{convert(Number(selected.price))}</b>
</p>

  {/* NUEVO: VALORACIÓN */}
  <p style={{ fontSize: 16, marginTop: 10 }}>
    ⭐ Valoración: <b>{selected.rating}</b>
  </p>

  {/* NUEVO: USO */}
  <p style={{ fontSize: 16, marginTop: 6, opacity: 0.85 }}>
    👟 Uso: <b>{selected.usage}</b>
  </p>

  {/* NUEVO: STOCK */}
  <p style={{ fontSize: 14, marginTop: 6 }}>
  📦 Estado:{' '}

  <b
    style={{
      color:
        selected.stock.includes('En stock')
          ? '#00ff99'
          : selected.stock.includes('Pocas')
          ? 'orange'
          : selected.stock.includes('Últimas')
          ? 'red'
          : '#ccc',
    }}
  >
    {selected.stock}
  </b>
</p>
</div>

    {/* BOTÓN */}
    <button
      onClick={() => window.open(selected.link, '_blank')}
      style={{
        ...buyBtn,
        marginTop: 28,
        padding: '14px 22px',
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 14,
        background: 'linear-gradient(90deg, #ff00cc, #3333ff)',
        border: 'none',
      }}
    >
      🛒 ¡Link Directo!
    </button>
  </div>
)}
    </main>
  )
}

/* ================= STYLES ================= */

const main: CSSProperties = {
  minHeight: '100vh',
  position: 'relative',
  color: 'var(--text)',
  fontFamily: 'sans-serif',
  overflow: 'hidden',
  background: 'var(--bg)',
}

const imgContainer: CSSProperties = {
  width: '100%',
  aspectRatio: '1 / 1',
  overflow: 'hidden',
  borderRadius: 12,
  background: '#fff',
}

const img: CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',   // 👈 ESTO es lo importante
  display: 'block',
}

/* capa elegante tipo Nike (MUY suave) */
const overlayBg: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.25)',
  zIndex: -1,
}

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
  gap: 16,
  marginTop: 25,
}

const card: CSSProperties = {
  background: 'var(--card)',
  padding: 12,
  borderRadius: 22,
  position: 'relative',
  cursor: 'pointer',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  backdropFilter: 'blur(12px)',
  border: '1px solid var(--border)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
  overflow: 'hidden',
  color: 'var(--text)',
}

const heart: CSSProperties = {
  position: 'absolute',
  top: 10,
  right: 10,
  cursor: 'pointer',
}

const badge: CSSProperties = {
  position: 'absolute',
  top: 8,
  left: 8,
  fontSize: 10,
  padding: '4px 8px',
  borderRadius: 6,
  background: '#ffd600',
  color: 'black',
  fontWeight: 'bold',
}

const detail: CSSProperties = {
  maxWidth: 500,
  margin: '0 auto',
  textAlign: 'center',
  paddingTop: 100,
  position: 'relative',
  zIndex: 1,
  backdropFilter: 'blur(6px)',
  background: 'var(--card)',
  borderRadius: 20,
  padding: 20,
  color: 'var(--text)',
  border: '1px solid var(--border)',
}

const backBtn: CSSProperties = {
  position: 'absolute',
  top: 10,
  left: 10,
  padding: '10px 16px',
  fontSize: 14,
  borderRadius: 999,
  border: '1px solid var(--border)',
  background: 'var(--card)',
  color: 'var(--text)',
}

const buyBtn: CSSProperties = {
  marginTop: 20,
  padding: 12,
  border: '1px solid var(--border)',
  background: 'var(--card)',
  color: 'var(--text)',
  borderRadius: 10,
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
  color: 'var(--text)',
  borderRight: '1px solid var(--border)',
}

const favPanel: CSSProperties = {
  position: 'fixed',
  top: 0,
  right: 0,
  width: 300,
  height: '100%',
  background: 'var(--bg)',
  padding: 20,
  zIndex: 9999,
  color: 'var(--text)',
  borderLeft: '1px solid var(--border)',
}

const favCard: CSSProperties = {
  marginTop: 10,
  padding: 8,
  border: '1px solid var(--border)',
  borderRadius: 10,
  cursor: 'pointer',
  background: 'var(--card)',
  color: 'var(--text)',
}

const favImg: CSSProperties = {
  width: '100%',
  borderRadius: 8,
}

const removeBtn: CSSProperties = {
  marginTop: 5,
  width: '100%',
  padding: 6,
  border: '1px solid var(--border)',
  background: 'var(--card)',
  color: 'var(--text)',
}

const overlay: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.2)',
  zIndex: 9998,
}

const topLeftBtn: CSSProperties = {
  position: 'absolute',
  top: 10,
  left: 13,
  background: 'var(--card)',
color: 'var(--text)',
border: '1px solid var(--border)',
  padding: '3px 14px',  // 👈 más ancho y alto
  fontSize: 20,          // 👈 icono más grande
  borderRadius: 5,
}

const topRightBtn: CSSProperties = {
  position: 'absolute',
  top: 10,
  right: 10,
  border: '1px solid var(--border)',
  background: 'var(--card)',
  color: 'var(--text)',
  padding: 6,
  borderRadius: 5,
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

const banner: CSSProperties = {
  width: 'fit-content',
  maxWidth: '100%',
  margin: '3px auto',
  marginTop: 12,
  padding: '6px 16px',
  borderRadius: 12,
  textAlign: 'center',
  fontSize: 25,
  fontWeight: 'bold',
  color: 'var(--text)',
  background: 'linear-gradient(90deg, #ff00cc, #3333ff)',
  lineHeight: 1.5,
}