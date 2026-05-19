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

type Review = {
  name: string
  stars: number
  text: string
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

const reviewsData: Record<number, Review[]> = {
  1: [
    { name: 'Alex', stars: 5, text: 'Muy cómodas, brutales 🔥' },
    { name: 'Carlos', stars: 4, text: 'Calidad top, talla bien' },
  ],
  2: [
    { name: 'María', stars: 5, text: 'Súper bonitas y ligeras' },
  ],
}

export default function Home() {
  const [selected, setSelected] = useState<Sneaker | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<Sneaker[]>([])
  const [brand, setBrand] = useState<'all' | 'Nike' | 'Adidas'>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return sneakers.filter(s => {
      const matchBrand = brand === 'all' || s.brand === brand
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.brand.toLowerCase().includes(search.toLowerCase())
      return matchBrand && matchSearch
    })
  }, [brand, search])

  const addToCart = (item: Sneaker) => {
    setCart(prev => [...prev, item])
  }

  const renderStars = (n: number) =>
    '⭐'.repeat(n) + '☆'.repeat(5 - n)

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
      {/* ================= TOP BAR ================= */}
      {!selected && (
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 34 }}>👟 SNEAKERS</h1>
          <p style={{ opacity: 0.7 }}>
            Tu marketplace de zapatillas
          </p>

          {/* MENU */}
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              position: 'absolute',
              top: 15,
              left: 15,
              padding: 8,
              borderRadius: 10,
              border: '1px solid white',
              background: 'transparent',
              color: 'white',
            }}
          >
            ☰
          </button>

          {/* CART BUTTON */}
          <div
            onClick={() => setCartOpen(true)}
            style={{
              position: 'absolute',
              top: 15,
              right: 15,
              cursor: 'pointer',
              fontSize: 18,
              border: '1px solid white',
              padding: '6px 10px',
              borderRadius: 10,
            }}
          >
            🛒: {cart.length}
          </div>
        </div>
      )}

      {/* ================= SIDEBAR ================= */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 280,
            height: '100%',
            background: '#111',
            padding: 20,
            zIndex: 2000,
          }}
        >
          <button onClick={() => setMenuOpen(false)} style={sideBtn}>
            ✕ Cerrar
          </button>

          <input
            placeholder="Buscar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={inputStyle}
          />

          <h3>Filtros</h3>

          <button style={sideBtn} onClick={() => setBrand('all')}>
            Todas
          </button>
          <button style={sideBtn} onClick={() => setBrand('Nike')}>
            Nike
          </button>
          <button style={sideBtn} onClick={() => setBrand('Adidas')}>
            Adidas
          </button>
        </div>
      )}

      {/* ================= CART PANEL ================= */}
      {cartOpen && (
        <div
          style={{
            position: 'fixed',
            right: 0,
            top: 0,
            width: 320,
            height: '100%',
            background: '#111',
            padding: 20,
            zIndex: 3000,
          }}
        >
          <button onClick={() => setCartOpen(false)} style={sideBtn}>
            ✕ Cerrar carrito
          </button>

          <h3>🛒 Carrito</h3>

          {cart.length === 0 && <p>Vacío</p>}

          {cart.map((item, i) => (
            <div
              key={i}
              style={{
                marginTop: 12,
                padding: 10,
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 10,
              }}
            >
              <p>{item.name}</p>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* ================= GRID ================= */}
      {!selected && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
            marginTop: 40,
          }}
        >
          {filtered.map(s => (
            <div
              key={s.id}
              onClick={() => setSelected(s)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 14,
                padding: 14,
                cursor: 'pointer',
              }}
            >
              <img
                src={s.image}
                style={{ width: '100%', borderRadius: 12 }}
              />

              <h3>{s.name}</h3>
              <p>{s.brand}</p>
              <p style={{ fontWeight: 'bold' }}>{s.price}</p>

              <button
                onClick={e => {
                  e.stopPropagation()
                  addToCart(s)
                }}
                style={btn}
              >
                🛒 Añadir
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= DETAIL ================= */}
      {selected && (
        <div
          style={{
            maxWidth: 520,
            margin: '0 auto',
            textAlign: 'center',
            paddingTop: 60,
          }}
        >
          <button onClick={() => setSelected(null)} style={backBtn}>
            ← Volver
          </button>

          <h2 style={{ fontSize: 30 }}>{selected.name}</h2>
          <p>{selected.brand}</p>
          <p style={{ fontWeight: 'bold' }}>{selected.price}</p>

          <img
            src={selected.image}
            style={{
              width: 320,
              borderRadius: 14,
              marginTop: 20,
            }}
          />

          <button
            onClick={() => addToCart(selected)}
            style={btn}
          >
            🛒 Añadir al carrito
          </button>

          {/* ================= REVIEWS ================= */}
          <div style={{ marginTop: 30, textAlign: 'left' }}>
            <h3>⭐ Reseñas</h3>

            {(reviewsData[selected.id] || []).map((r, i) => (
              <div
                key={i}
                style={{
                  marginTop: 10,
                  padding: 10,
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 10,
                }}
              >
                <strong>{r.name}</strong>
                <p>{renderStars(r.stars)}</p>
                <p style={{ opacity: 0.8 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

/* ================= STYLES ================= */

const sideBtn = {
  display: 'block',
  marginTop: 12,
  padding: 10,
  width: '100%',
  borderRadius: 10,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  cursor: 'pointer',
}

const btn = {
  marginTop: 10,
  width: '100%',
  padding: 10,
  borderRadius: 10,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
}

const backBtn = {
  position: 'absolute' as const,
  top: 15,
  left: 15,
  padding: 10,
  borderRadius: 10,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
}

const inputStyle = {
  width: '100%',
  padding: 10,
  borderRadius: 8,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  marginBottom: 20,
}