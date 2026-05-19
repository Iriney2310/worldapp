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
  const [cart, setCart] = useState<Sneaker[]>([])

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

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id))
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

          <div style={{ textAlign: 'center' }}>
            <h1>SNEAKERS</h1>
            <p style={{ opacity: 0.7 }}>
              ¡Tu marketplace de zapatillas!
            </p>

            <p style={{ marginTop: 10 }}>
              🛒 Carrito: {cart.length}
            </p>
          </div>
        </>
      )}

      {/* SIDEBAR */}
      {!selected && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: menuOpen ? 0 : '-280px',
            width: 280,
            height: '100%',
            background: '#b51818',
            padding: 20,
            transition: '0.3s',
            zIndex: 1000,
            borderRight: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <button onClick={() => setMenuOpen(false)} style={sideBtn}>
            ✕ Cerrar
          </button>

          {/* SEARCH */}
          <input
            placeholder="Buscar zapatillas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: 10,
              marginTop: 10,
              borderRadius: 8,
              border: '1px solid white',
              background: 'transparent',
              color: 'white',
            }}
          />

          <h3 style={{ marginTop: 20 }}>Filtros</h3>

          <button onClick={() => setBrand('all')} style={sideBtn}>
            Todas
          </button>

          <button onClick={() => setBrand('Nike')} style={sideBtn}>
            Nike
          </button>

          <button onClick={() => setBrand('Adidas')} style={sideBtn}>
            Adidas
          </button>

          <h3 style={{ marginTop: 20 }}>Carrito</h3>

          {cart.length === 0 && (
            <p style={{ opacity: 0.6 }}>Vacío</p>
          )}

          {cart.map(item => (
            <div
              key={item.id}
              style={{
                marginTop: 10,
                padding: 8,
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 8,
              }}
            >
              <p style={{ fontSize: 12 }}>{item.name}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                style={sideBtn}
              >
                Quitar
              </button>
            </div>
          ))}
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
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 14,
                padding: 12,
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
                style={{
                  marginTop: 10,
                  padding: 8,
                  width: '100%',
                  border: '1px solid white',
                  background: 'transparent',
                  color: 'white',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                🛒 Añadir
              </button>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL */}
      {selected && (
        <div style={{ textAlign: 'center', paddingTop: 60 }}>
          <button onClick={() => setSelected(null)}>
            ← Volver
          </button>

          <h2>{selected.name}</h2>

          <img
            src={selected.image}
            style={{ width: 300, borderRadius: 12 }}
          />

          <button
            onClick={() => addToCart(selected)}
            style={{
              marginTop: 20,
              padding: 14,
              border: '1px solid white',
              background: 'transparent',
              color: 'white',
              borderRadius: 10,
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
  marginTop: 10,
  padding: 10,
  width: '100%',
  borderRadius: 10,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  cursor: 'pointer',
}