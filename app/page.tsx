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
  const [cartOpen, setCartOpen] = useState(false)
  const [shake, setShake] = useState(false)

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

    // 🔊 sonido
    const audio = new Audio(
      'https://actions.google.com/sounds/v1/cartoon/pop.ogg'
    )
    audio.volume = 0.3
    audio.play()

    // 📳 shake
    setShake(true)
    setTimeout(() => setShake(false), 400)
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
              padding: 10,
              borderRadius: 10,
              border: '1px solid white',
              background: 'transparent',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            ☰
          </button>

          {/* 🛒 CART ICON */}
          <div
            onClick={() => setCartOpen(true)}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 10px',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(0,0,0,0.4)',
              cursor: 'pointer',
              animation: shake ? 'shake 0.4s' : undefined,
            }}
          >
            <span>🛒</span>
            <span>:</span>
            <span style={{ fontWeight: 'bold' }}>{cart.length}</span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h1>SNEAKERS</h1>
            <p style={{ opacity: 0.7 }}>
              ¡Tu marketplace de zapatillas!
            </p>
          </div>
        </>
      )}

      {/* SIDEBAR FILTER */}
      {!selected && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: menuOpen ? 0 : '-280px',
            width: 280,
            height: '100%',
            background: '#111',
            padding: 20,
            transition: '0.3s',
            zIndex: 1000,
            borderRight: '1px solid #333',
          }}
        >
          <button onClick={() => setMenuOpen(false)} style={sideBtn}>
            ✕ Cerrar
          </button>

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

      {/* CART DRAWER */}
      {cartOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: 320,
            height: '100%',
            background: '#111',
            borderLeft: '1px solid #333',
            padding: 20,
            zIndex: 2000,
            overflowY: 'auto',
          }}
        >
          <button onClick={() => setCartOpen(false)} style={sideBtn}>
            ✕ Cerrar
          </button>

          <h2>🛒 Carrito</h2>

          {cart.length === 0 ? (
            <p style={{ opacity: 0.6 }}>Vacío</p>
          ) : (
            cart.map(item => (
              <div
                key={item.id}
                style={{
                  marginTop: 10,
                  padding: 10,
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                }}
              >
                <img
                  src={item.image}
                  style={{ width: '100%', borderRadius: 8 }}
                />
                <p>{item.name}</p>
                <p>{item.price}</p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={sideBtn}
                >
                  Quitar
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* ANIMATION */}
      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          50% { transform: translateX(3px); }
          75% { transform: translateX(-3px); }
          100% { transform: translateX(0); }
        }
      `}</style>
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