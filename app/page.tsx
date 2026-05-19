'use client'

import { useMemo, useState } from 'react'

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
  const [brand, setBrand] = useState<'all' | 'Nike' | 'Adidas'>('all')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])

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

  const isFavorite = (id: number) => favorites.includes(id)

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0b0b0b',
        color: 'white',
        fontFamily: 'sans-serif',
        padding: 20,
        position: 'relative',
      }}
    >

      {/* TOP BAR */}
      {!selected && (
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 34 }}>👟 SNEAKERS</h1>
          <p style={{ opacity: 0.7 }}>Marketplace de zapatillas</p>

          <button
            onClick={() => setMenuOpen(true)}
            style={btnTopLeft}
          >
            ☰
          </button>
        </div>
      )}

      {/* SIDEBAR */}
      {menuOpen && !selected && (
        <div style={sidebar}>
          <button onClick={() => setMenuOpen(false)} style={sideBtn}>
            ✕ Cerrar
          </button>

          <input
            placeholder="Buscar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={input}
          />

          <button onClick={() => setBrand('all')} style={sideBtn}>
            Todas
          </button>
          <button onClick={() => setBrand('Nike')} style={sideBtn}>
            Nike
          </button>
          <button onClick={() => setBrand('Adidas')} style={sideBtn}>
            Adidas
          </button>
        </div>
      )}

      {/* GRID */}
      {!selected && (
        <div style={grid}>
          {filtered.map(s => (
            <div
              key={s.id}
              style={card}
              onClick={() => setSelected(s)}
            >

              {/* ❤️ FAVORITO */}
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(s.id)
                }}
                style={heart}
              >
                {isFavorite(s.id) ? '❤️' : '🤍'}
              </div>

              <img src={s.image} style={img} />

              <h3>{s.name}</h3>
              <p>{s.brand}</p>
              <p style={{ fontWeight: 'bold' }}>{s.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL (ARREGLADO) */}
      {selected && (
        <div style={detail}>

          <button
            onClick={() => setSelected(null)}
            style={backBtn}
          >
            ← Volver
          </button>

          <h2 style={{ fontSize: 28 }}>{selected.name}</h2>
          <p>{selected.brand}</p>
          <p style={{ fontWeight: 'bold' }}>{selected.price}</p>

          <div style={center}>
            <img src={selected.image} style={imgDetail} />
          </div>

          <button
            onClick={() => window.open(selected.link, '_blank')}
            style={buyBtn}
          >
            🛒 Comprar
          </button>

        </div>
      )}
    </main>
  )
}

/* ================= STYLES ================= */

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
  gap: 16,
  marginTop: 40,
}

const card = {
  background: 'rgba(255,255,255,0.05)',
  padding: 12,
  borderRadius: 14,
  position: 'relative' as const,
  cursor: 'pointer',
}

const img = {
  width: '100%',
  height: 140,
  objectFit: 'cover' as const,
  borderRadius: 12,
}

const imgDetail = {
  width: 320,
  borderRadius: 14,
}

const heart = {
  position: 'absolute' as const,
  top: 10,
  right: 10,
  cursor: 'pointer',
  fontSize: 18,
}

const center = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: 20,
}

const detail = {
  maxWidth: 500,
  margin: '0 auto',
  textAlign: 'center' as const,
  paddingTop: 60,
  position: 'relative' as const,
}

const backBtn = {
  position: 'absolute' as const,
  top: 10,
  left: 10,
  padding: '6px 12px',
  borderRadius: 999,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  cursor: 'pointer',
}

const buyBtn = {
  marginTop: 25,
  padding: 14,
  width: 220,
  borderRadius: 12,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  cursor: 'pointer',
}

const sidebar = {
  position: 'fixed' as const,
  top: 0,
  left: 0,
  width: 280,
  height: '100%',
  background: '#111',
  padding: 20,
}

const sideBtn = {
  width: '100%',
  marginTop: 10,
  padding: 10,
  borderRadius: 10,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
}

const input = {
  width: '100%',
  padding: 10,
  marginTop: 10,
  borderRadius: 8,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
}

const btnTopLeft = {
  position: 'absolute' as const,
  top: 10,
  left: 10,
  padding: 8,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
}