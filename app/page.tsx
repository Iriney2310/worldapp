'use client'

import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'

type Sneaker = {
  id: number
  name: string
  brand: string
  price: string
  image: string
  link: string
  badge?: 'NEW' | 'HOT' | 'BESTSELLER'
}

const sneakers: Sneaker[] = [
  {
    id: 1,
    name: 'Nike Air Force 1',
    brand: 'Nike',
    price: '95,95€',
    image:
      'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/e777c881-5b62-4250-92a6-362967f54cca/WMNS+AIR+FORCE+1+%2707.png',
    link: 'https://www.amazon.es/dp/B08QB1YKTR?tag=iriney06-21',
    badge: 'BESTSELLER',
  },
  {
    id: 2,
    name: 'Adidas Grand Court',
    brand: 'Adidas',
    price: '39,99€-54,99€',
    image:
      'https://cdn1.ozone.ru/s3/multimedia-1-l/c600/7032969129.jpg',
    link: 'https://amzn.to/3Px9aGX',
    badge: 'HOT',
  },
]

export default function Home() {
  const [selected, setSelected] = useState<Sneaker | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [favOpen, setFavOpen] = useState(false)
  const [brand, setBrand] = useState<'all' | 'Nike' | 'Adidas'>('all')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [closing, setClosing] = useState(false)

  const filtered = useMemo(() => {
    return sneakers.filter(s => {
      const matchBrand = brand === 'all' || s.brand === brand
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.brand.toLowerCase().includes(search.toLowerCase())

      return matchBrand && matchSearch
    })
  }, [brand, search])

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    )
  }

  const favItems = sneakers.filter(s =>
    favorites.includes(s.id)
  )

  const closeDetail = () => {
    setClosing(true)
    setTimeout(() => {
      setSelected(null)
      setClosing(false)
    }, 200)
  }

  return (
    <main style={main}>

      {/* TOP BAR */}
      {!selected && (
        <div style={{ textAlign: 'center' }}>
          <h1>¡SNEAKERS!</h1>
          <p style={{ opacity: 0.7 }}>
            Tus Sneakers Favoritas A Un Solo Click👟
          </p>

          <button onClick={() => setMenuOpen(true)} style={topLeftBtn}>
            ☰
          </button>

          <button onClick={() => setFavOpen(true)} style={topRightBtn}>
            ❤️ {favorites.length}
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
          onChange={e => setSearch(e.target.value)}
          placeholder="🔎 Buscar..."
          style={input}
        />

        <button onClick={() => setBrand('all')} style={sideBtn}>Todas</button>
        <button onClick={() => setBrand('Nike')} style={sideBtn}>Nike</button>
        <button onClick={() => setBrand('Adidas')} style={sideBtn}>Adidas</button>
      </div>

      {/* FAVORITOS */}
      <div
        style={{
          ...favPanel,
          transform: favOpen ? 'translateX(0)' : 'translateX(110%)',
          transition: '0.35s cubic-bezier(0.2,0.8,0.2,1)',
        }}
      >
        <button onClick={() => setFavOpen(false)} style={sideBtn}>
          ✕ Cerrar Favoritos
        </button>

        {favItems.length === 0 && (
          <p style={{ opacity: 0.6 }}>No tienes favoritos</p>
        )}

        {favItems.map(item => (
          <div
            key={item.id}
            style={favCard}
            onClick={() => setSelected(item)}
          >
            <img src={item.image} style={favImg} />
            <p>{item.name}</p>

            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(item.id)
              }}
              style={removeBtn}
            >
              Quitar
            </button>
          </div>
        ))}
      </div>

      {/* GRID */}
      {!selected && (
        <div style={grid}>
          {filtered.map(s => (
            <div
              key={s.id}
              style={card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
                e.currentTarget.style.transition = '0.2s ease'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
              }}
              onClick={() => setSelected(s)}
            >
              {s.badge && <div style={badge}>{s.badge}</div>}

              <div
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(s.id)
                }}
                style={heart}
              >
                {favorites.includes(s.id) ? '❤️' : '🤍'}
              </div>

              <img src={s.image} style={img} />

              <h3>{s.name}</h3>
              <p>{s.brand}</p>
              <p style={{ fontWeight: 'bold' }}>{s.price}</p>
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
            transition: '0.25s ease',
          }}
        >
          <button onClick={closeDetail} style={backBtn}>
            ← Volver
          </button>

          <h2>{selected.name}</h2>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={selected.image}
              style={{
                width: 320,
                borderRadius: 14,
                objectFit: 'contain',
              }}
            />
          </div>

          <p>{selected.brand}</p>
          <p style={{ fontWeight: 'bold' }}>{selected.price}</p>

          <button
            onClick={() => window.open(selected.link, '_blank')}
            style={buyBtn}
          >
            🛒 LINK DE AMAZON
          </button>
        </div>
      )}
    </main>
  )
}

/* ================= STYLES ================= */

const main: CSSProperties = {
  minHeight: '100vh',
  background: '#0b0b0b',
  color: 'white',
  fontFamily: 'sans-serif',
  padding: 20,
}

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
  gap: 16,
  marginTop: 40,
}

const card: CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  padding: 12,
  borderRadius: 14,
  position: 'relative',
  cursor: 'pointer',
  transition: '0.2s ease',
}

const img: CSSProperties = {
  width: '100%',
  borderRadius: 12,
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
  paddingTop: 60,
  position: 'relative',
}

const backBtn: CSSProperties = {
  position: 'absolute',
  top: 10,
  left: 10,
  padding: '6px 12px',
  borderRadius: 999,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
}

const buyBtn: CSSProperties = {
  marginTop: 20,
  padding: 12,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  borderRadius: 10,
}

const sidebar: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: 280,
  height: '100%',
  background: '#111',
  padding: 20,
  zIndex: 9999,
}

const favPanel: CSSProperties = {
  position: 'fixed',
  top: 0,
  right: 0,
  width: 300,
  height: '100%',
  background: '#111',
  padding: 20,
  zIndex: 9999,
}

const favCard: CSSProperties = {
  marginTop: 10,
  padding: 8,
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: 10,
  cursor: 'pointer',
}

const favImg: CSSProperties = {
  width: '100%',
  borderRadius: 8,
}

const removeBtn: CSSProperties = {
  marginTop: 5,
  width: '100%',
  padding: 6,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
}

const overlay: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.5)',
  zIndex: 9998,
}

const topLeftBtn: CSSProperties = {
  position: 'absolute',
  top: 10,
  left: 10,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  padding: 6,
}

const topRightBtn: CSSProperties = {
  position: 'absolute',
  top: 10,
  right: 10,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  padding: 6,
}

const sideBtn: CSSProperties = {
  display: 'block',
  marginTop: 10,
  padding: 10,
  width: '100%',
  borderRadius: 10,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
}

const input: CSSProperties = {
  width: '100%',
  padding: 10,
  marginTop: 10,
  borderRadius: 8,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
}