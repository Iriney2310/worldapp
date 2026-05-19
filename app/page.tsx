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
        <>
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              padding: 15,
              borderRadius: 10,
              border: '1px solid white',
              background: 'transparent',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            ☰
          </button>

          {/* CART BUTTON */}
          <div
            onClick={() => setCartOpen(true)}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              padding: '4px 8px',
              borderRadius: 10,
              border: '1px solid white',
              cursor: 'pointer',
            }}
          >
            🛒:{cart.length}
          </div>

          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 34 }}>¡SNEAKERS!</h1>
            <p style={{ opacity: 0.7 }}>Tus Sneakers Favoritas</p>
          </div>
        </>
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
          <button onClick={() => setMenuOpen(false)} style={sideBtn}>
            ✕ Cerrar
          </button>

          <input
            placeholder="Buscar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={inputStyle}
          />

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

      {/* CART */}
      {cartOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: 300,
            height: '100%',
            background: '#111',
            padding: 20,
            zIndex: 3000,
          }}
        >
          <button onClick={() => setCartOpen(false)} style={sideBtn}>
            ✕ Cerrar carrito
          </button>

          {cart.length === 0 ? (
            <p style={{ opacity: 0.6 }}>Carrito vacío</p>
          ) : (
            cart.map((item, i) => (
              <div key={i} style={cartItem}>
                <p style={{ fontSize: 12 }}>{item.name}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* GRID */}
      {!selected && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
            marginTop: 30,
          }}
        >
          {filtered.map(s => (
            <div
              key={s.id}
              onClick={() => setSelected(s)}
              style={cardStyle}
            >
              <img src={s.image} style={imgStyle} />

              <h3 style={{ fontSize: 14 }}>{s.name}</h3>
              <p style={{ opacity: 0.7 }}>{s.brand}</p>
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

      {/* DETAIL */}
      {selected && (
        <div
          style={{
            maxWidth: 520,
            margin: '0 auto',
            textAlign: 'center',
            paddingTop: 70,
            position: 'relative',
          }}
        >

          {/* BACK BUTTON FIXED */}
          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'absolute',
              top: 7,
              left: 7,
              padding: '6px 12px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.05)',
              color: 'white',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            ← Volver
          </button>

          <h2 style={{ fontSize: 30 }}>{selected.name}</h2>
          <p>{selected.brand}</p>
          <p style={{ fontWeight: 'bold' }}>{selected.price}</p>

          {/* IMAGE CENTERED */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={selected.image}
              style={{
                width: 340,
                borderRadius: 14,
              }}
            />
          </div>

          {/* AMAZON BUTTON */}
          <div style={{ marginTop: 25 }}>
            <button
              onClick={() => window.open(selected.link, '_blank')}
              style={{
                padding: 14,
                width: 220,
                borderRadius: 12,
                border: '1px solid #00c853',
                background: 'transparent',
                color: '#00c853',
                fontWeight: 'bold',
              }}
            >
              🌐 Comprar en Amazon
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

/* STYLES */
const cardStyle = {
  background: 'rgba(255,255,255,0.05)',
  borderRadius: 14,
  padding: 14,
  cursor: 'pointer',
}

const imgStyle = {
  width: '100%',
  height: 140,
  objectFit: 'cover' as const,
  borderRadius: 12,
  marginBottom: 10,
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

const sideBtn = {
  display: 'block',
  marginTop: 12,
  padding: 10,
  width: '100%',
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

const cartItem = {
  padding: 10,
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: 10,
  marginTop: 10,
}