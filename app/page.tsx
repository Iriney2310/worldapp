'use client'

import { useMemo, useRef, useState } from 'react'

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
  const [cart, setCart] = useState<Sneaker[]>([])
  const [flyItem, setFlyItem] = useState<any>(null)
  const [shake, setShake] = useState(false)

  const cartRef = useRef<HTMLDivElement | null>(null)

  const filtered = useMemo(() => {
    if (brand === 'all') return sneakers
    return sneakers.filter(s => s.brand === brand)
  }, [brand])

  const addToCart = (item: Sneaker, e?: any) => {
    setCart(prev => [...prev, item])

    setShake(true)
    setTimeout(() => setShake(false), 400)

    if (!e?.currentTarget || !cartRef.current) return

    const rect = e.currentTarget.getBoundingClientRect()
    const cartRect = cartRef.current.getBoundingClientRect()

    setFlyItem({
      image: item.image,
      top: rect.top,
      left: rect.left,
    })

    setTimeout(() => {
      setFlyItem({
        image: item.image,
        top: cartRect.top,
        left: cartRect.left,
        transition: 'all 0.6s ease-in-out',
      })
    }, 50)

    setTimeout(() => setFlyItem(null), 700)
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
      {/* ☰ MENU BUTTON */}
      {!selected && (
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
      )}

      {/* 🛒 CART TOP RIGHT */}
      {!selected && (
        <div
          ref={cartRef}
          style={{
            position: 'absolute',
            top: 15,
            right: 20,
            fontSize: 18,
            zIndex: 10,
            transform: shake ? 'scale(1.2)' : 'scale(1)',
            transition: '0.2s',
          }}
        >
          🛒: {cart.length}
        </div>
      )}

      {/* ✈️ FLYING ITEM */}
      {flyItem && (
        <img
          src={flyItem.image}
          style={{
            position: 'fixed',
            top: flyItem.top,
            left: flyItem.left,
            width: 60,
            height: 60,
            borderRadius: 10,
            zIndex: 9999,
            transition: flyItem.transition,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* SIDEBAR */}
      {!selected && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: menuOpen ? 0 : '-260px',
            width: 260,
            height: '100%',
            background: '#111',
            padding: 20,
            transition: '0.3s',
            zIndex: 1000,
          }}
        >
          <button onClick={() => setMenuOpen(false)} style={sideBtn}>
            ✕ Cerrar
          </button>

          <h3>Filtros</h3>

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

      {/* HOME */}
      {!selected && (
        <div style={{ textAlign: 'center' }}>
          <h1>👟 SNEAKERS</h1>
          <p style={{ opacity: 0.7 }}>Tu tienda de zapatillas</p>
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
                position: 'relative',
              }}
            >
              <img
                src={s.image}
                style={{
                  width: '100%',
                  borderRadius: 12,
                }}
              />

              <h3>{s.name}</h3>
              <p>{s.brand}</p>
              <p style={{ fontWeight: 'bold' }}>{s.price}</p>

              <button
                onClick={e => {
                  e.stopPropagation()
                  addToCart(s, e)
                }}
                style={{
                  marginTop: 10,
                  padding: 10,
                  width: '100%',
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

      {/* DETAIL */}
      {selected && (
        <div style={{ textAlign: 'center', paddingTop: 60 }}>
          <button onClick={() => setSelected(null)}>
            ← Volver
          </button>

          <h2>{selected.name}</h2>

          <img
            src={selected.image}
            style={{ width: 320, borderRadius: 12 }}
          />

          <button
            onClick={e => addToCart(selected, e)}
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