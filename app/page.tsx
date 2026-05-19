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
      {/* ================= TOP BAR ================= */}
      {!selected && (
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 34, marginBottom: 5 }}>
            👟 SNEAKERS
          </h1>
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
              cursor: 'pointer',
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
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              marginBottom: 15,
              padding: 10,
              width: '100%',
              borderRadius: 10,
              border: '1px solid white',
              background: 'transparent',
              color: 'white',
            }}
          >
            ✕ Cerrar
          </button>

          <input
            placeholder="Buscar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: 10,
              borderRadius: 8,
              border: '1px solid white',
              background: 'transparent',
              color: 'white',
              marginBottom: 20,
            }}
          />

          <h3 style={{ marginBottom: 10 }}>Filtros</h3>

          <button style={sideBtn} onClick={() => setBrand('all')}>
            Todas
          </button>
          <button style={sideBtn} onClick={() => setBrand('Nike')}>
            Nike
          </button>
          <button style={sideBtn} onClick={() => setBrand('Adidas')}>
            Adidas
          </button>

          <h3 style={{ marginTop: 25 }}>Carrito</h3>

          {cart.length === 0 && (
            <p style={{ opacity: 0.6 }}>Vacío</p>
          )}

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
              <p style={{ marginBottom: 6 }}>{item.name}</p>
              <button style={sideBtn}>Quitar</button>
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
            gap: 18,
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
                style={{
                  width: '100%',
                  borderRadius: 12,
                  marginBottom: 10,
                }}
              />

              <h3 style={{ marginBottom: 5 }}>{s.name}</h3>
              <p style={{ opacity: 0.8 }}>{s.brand}</p>
              <p style={{ fontWeight: 'bold' }}>{s.price}</p>

              <button
                onClick={e => {
                  e.stopPropagation()
                  addToCart(s)
                }}
                style={{
                  marginTop: 10,
                  width: '100%',
                  padding: 10,
                  borderRadius: 10,
                  border: '1px solid white',
                  background: 'transparent',
                  color: 'white',
                }}
              >
                🛒 Añadir
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= DETAIL FIXED ================= */}
      {selected && (
        <div
          style={{
            maxWidth: 520,
            margin: '0 auto',
            textAlign: 'center',
            paddingTop: 70,
          }}
        >
          {/* BACK FIX */}
          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'absolute',
              top: 15,
              left: 15,
              padding: 10,
              borderRadius: 10,
              border: '1px solid white',
              background: 'transparent',
              color: 'white',
            }}
          >
            ← Volver
          </button>

          <h2 style={{ fontSize: 30, marginBottom: 5 }}>
            {selected.name}
          </h2>

          <p style={{ opacity: 0.8 }}>{selected.brand}</p>
          <p style={{ fontWeight: 'bold', fontSize: 18 }}>
            {selected.price}
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 25,
            }}
          >
            <img
              src={selected.image}
              style={{
                width: 320,
                borderRadius: 14,
              }}
            />
          </div>

          <button
            onClick={() => addToCart(selected)}
            style={{
              marginTop: 25,
              padding: 14,
              borderRadius: 12,
              border: '1px solid white',
              background: 'transparent',
              color: 'white',
              width: 200,
            }}
          >
            🛒 Añadir al carrito
          </button>
        </div>
      )}
    </main>
  )
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