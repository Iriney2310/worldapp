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
  const [cart, setCart] = useState<Sneaker[]>([])
  const [anim, setAnim] = useState(false)
  const [flyStyle, setFlyStyle] = useState<any>(null)

  const cartRef = useRef<HTMLDivElement | null>(null)
  const soundRef = useRef<HTMLAudioElement | null>(null)

  // 🔊 sonido solo en cliente
  const playSound = () => {
    if (typeof window === 'undefined') return
    if (!soundRef.current) {
      soundRef.current = new Audio(
        'https://actions.google.com/sounds/v1/cartoon/pop.ogg'
      )
      soundRef.current.volume = 0.3
    }
    soundRef.current.currentTime = 0
    soundRef.current.play()
  }

  const addToCart = (item: Sneaker, e?: any) => {
    setCart(prev => [...prev, item])
    playSound()

    // ✨ ANIMACIÓN FLY TO CART
    if (e?.currentTarget && cartRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const cartRect = cartRef.current.getBoundingClientRect()

      setFlyStyle({
        top: rect.top,
        left: rect.left,
        width: 80,
        height: 80,
        backgroundImage: `url(${item.image})`,
      })

      setTimeout(() => {
        setFlyStyle({
          top: cartRect.top,
          left: cartRect.left,
          width: 20,
          height: 20,
          opacity: 0,
          transition: 'all 0.7s ease-in-out',
        })
      }, 50)

      setAnim(true)
      setTimeout(() => setAnim(false), 700)
      setTimeout(() => setFlyStyle(null), 800)
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        fontFamily: 'sans-serif',
        padding: 20,
      }}
    >
      {/* 🌫️ OVERLAY */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          pointerEvents: 'none',
        }}
      />

      {/* 🛒 CART ICON */}
      <div
        ref={cartRef}
        style={{
          position: 'absolute',
          top: 15,
          right: 20,
          zIndex: 10,
          fontSize: 18,
          transform: anim ? 'scale(1.3)' : 'scale(1)',
          transition: '0.2s',
        }}
      >
        🛒:{' '}
        <span style={{ fontWeight: 'bold' }}>{cart.length}</span>
      </div>

      {/* ✈️ FLYING ITEM */}
      {flyStyle && (
        <div
          style={{
            position: 'fixed',
            zIndex: 9999,
            borderRadius: 12,
            backgroundSize: 'cover',
            backgroundImage: flyStyle.backgroundImage,
            width: flyStyle.width,
            height: flyStyle.height,
            top: flyStyle.top,
            left: flyStyle.left,
            transition: flyStyle.transition,
            opacity: flyStyle.opacity ?? 1,
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
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
            {sneakers.map(s => (
              <div
                key={s.id}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 14,
                  padding: 12,
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onClick={() => setSelected(s)}
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
              style={{
                width: 320,
                borderRadius: 12,
                marginTop: 20,
              }}
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
      </div>
    </main>
  )
}