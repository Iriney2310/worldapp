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
          <p style={{ opacity: 0.7 }}>
            Tu marketplace de zapatillas
          </p>

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

          <div
            style={{
              position: 'absolute',
              top: 15,
              right: 15,
            }}
          >
            🛒 {cart.length}
          </div>
        </div>
      )}

      {/* SIDEBAR */}
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
          <button
            onClick={() => setMenuOpen(false)}
            style={sideBtn}
          >
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

      {/* GRID */}
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
              style={cardStyle}
            >
              {s.badge && (
                <div style={badgeStyle}>{s.badge}</div>
              )}

              <img
                src={s.image}
                style={imgStyle}
              />

              <div style={{ flex: 1 }}>
                <h3 style={titleStyle}>{s.name}</h3>
                <p style={brandStyle}>{s.brand}</p>
                <p style={priceStyle}>{s.price}</p>
              </div>

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

      {/* DETAIL */}
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
          <p style={{ fontWeight: 'bold', fontSize: 18 }}>
            {selected.price}
          </p>

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
        </div>
      )}
    </main>
  )
}

/* ================= ESTILOS ================= */

const cardStyle = {
  background: 'rgba(255,255,255,0.05)',
  borderRadius: 14,
  padding: 14,
  cursor: 'pointer',
  border: '1px solid rgba(255,255,255,0.1)',
  display: 'flex',
  flexDirection: 'column' as const,
  height: 320, // 🔥 TODAS IGUALES
}

const imgStyle = {
  width: '100%',
  height: 140, // 🔥 MISMA ALTURA
  objectFit: 'cover' as const,
  borderRadius: 12,
  marginBottom: 10,
}

const titleStyle = { fontSize: 14, margin: 0 }
const brandStyle = { opacity: 0.7, margin: 0 }
const priceStyle = { fontWeight: 'bold', margin: 0 }

const badgeStyle = {
  position: 'absolute' as const,
  top: 10,
  left: 10,
  fontSize: 10,
  padding: '4px 8px',
  borderRadius: 6,
  background: '#ffd600',
  color: 'black',
  fontWeight: 'bold',
}

const btn = {
  marginTop: 10,
  width: '100%',
  padding: 10,
  borderRadius: 10,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  cursor: 'pointer',
}

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

const inputStyle = {
  width: '100%',
  padding: 10,
  borderRadius: 8,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  marginBottom: 20,
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