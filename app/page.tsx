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
  const [cartOpen, setCartOpen] = useState(false)

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
        backgroundImage: "url('/fondo.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        fontFamily: 'sans-serif',
        padding: 20,
        position: 'relative',
      }}
    >
      {/* OVERLAY */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* TOP BAR */}
        {!selected && (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 34 }}>👟 SNEAKERS</h1>
            <p style={{ opacity: 0.7 }}>
              Tu marketplace de zapatillas
            </p>

            {/* CART */}
            <div
              onClick={() => setCartOpen(true)}
              style={{
                position: 'absolute',
                top: 15,
                right: 20,
                cursor: 'pointer',
                fontSize: 18,
              }}
            >
              🛒: {cart.length}
            </div>

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
          </div>
        )}

        {/* SIDEBAR */}
        {menuOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 260,
              height: '100%',
              background: '#111',
              padding: 20,
              zIndex: 2000,
            }}
          >
            <button onClick={() => setMenuOpen(false)}>
              ✕ Cerrar
            </button>

            <input
              placeholder="Buscar zapatillas..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                marginTop: 10,
                padding: 10,
                borderRadius: 8,
              }}
            />

            <h3>Filtros</h3>

            <button onClick={() => setBrand('all')}>Todas</button>
            <button onClick={() => setBrand('Nike')}>Nike</button>
            <button onClick={() => setBrand('Adidas')}>Adidas</button>
          </div>
        )}

        {/* CART PANEL */}
        {cartOpen && (
          <div
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              width: 300,
              height: '100%',
              background: '#111',
              padding: 20,
              zIndex: 3000,
            }}
          >
            <button onClick={() => setCartOpen(false)}>
              ✕ Cerrar
            </button>

            <h3>🛒 Carrito</h3>

            {cart.length === 0 && <p>Vacío</p>}

            {cart.map((item, i) => (
              <div key={i} style={{ marginTop: 10 }}>
                <p>{item.name}</p>
                <p>{item.price}</p>
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
              marginTop: 40,
            }}
          >
            {filtered.map(s => (
              <div
                key={s.id}
                onClick={() => setSelected(s)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  padding: 12,
                  borderRadius: 14,
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {s.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      fontSize: 10,
                      padding: '4px 8px',
                      borderRadius: 6,
                      background:
                        s.badge === 'NEW'
                          ? '#00c853'
                          : s.badge === 'HOT'
                          ? '#ff3d00'
                          : '#ffd600',
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    {s.badge}
                  </div>
                )}

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
                    width: '100%',
                    padding: 10,
                    border: '1px solid white',
                    background: 'transparent',
                    color: 'white',
                    borderRadius: 10,
                  }}
                >
                  🛒 Añadir
                </button>
              </div>
            ))}
          </div>
        )}

        {/* DETAIL VIEW COMPLETO */}
        {selected && (
          <div
            style={{
              maxWidth: 500,
              margin: '0 auto',
              textAlign: 'center',
              paddingTop: 60,
            }}
          >
            <button onClick={() => setSelected(null)}>
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
                borderRadius: 12,
                marginTop: 20,
              }}
            />

            <button
              onClick={() => addToCart(selected)}
              style={{
                marginTop: 25,
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
      </div>
    </main>
  )
}