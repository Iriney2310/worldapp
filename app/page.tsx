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
  const [cart, setCart] = useState<Sneaker[]>([])
  const [shake, setShake] = useState(false)

  // 🔊 sonido sin delay
  const popSound = useMemo(() => {
    const audio = new Audio(
      'https://actions.google.com/sounds/v1/cartoon/pop.ogg'
    )
    audio.volume = 0.3
    return audio
  }, [])

  const addToCart = (item: Sneaker) => {
    setCart(prev => [...prev, item])

    popSound.currentTime = 0
    popSound.play()

    setShake(true)
    setTimeout(() => setShake(false), 400)
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        fontFamily: 'sans-serif',
        padding: 20,
        position: 'relative',
      }}
    >
      {/* 🌫️ OVERLAY */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.65)',
          zIndex: 0,
        }}
      />

      {/* CONTENIDO */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* 🛒 TOP BAR */}
        {!selected && (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 34 }}>👟 SNEAKERS</h1>

            <div
              style={{
                marginTop: 10,
                fontSize: 18,
                display: 'flex',
                justifyContent: 'center',
                gap: 6,
                transform: shake ? 'scale(1.1)' : 'scale(1)',
                transition: '0.2s',
              }}
            >
              🛒: {cart.length}
            </div>
          </div>
        )}

        {/* 🏪 GRID */}
        {!selected && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 16,
              marginTop: 30,
            }}
          >
            {sneakers.map(s => (
              <div
                key={s.id}
                onClick={() => setSelected(s)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 14,
                  padding: 12,
                  cursor: 'pointer',
                  position: 'relative',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {/* BADGE */}
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
                  style={{
                    width: '100%',
                    borderRadius: 12,
                    marginBottom: 8,
                  }}
                />

                <h3 style={{ fontSize: 14 }}>{s.name}</h3>
                <p style={{ opacity: 0.7 }}>{s.brand}</p>
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

        {/* 👟 DETAIL */}
        {selected && (
          <div
            style={{
              maxWidth: 500,
              margin: '0 auto',
              textAlign: 'center',
              position: 'relative',
              paddingTop: 60,
            }}
          >
            {/* ← VOLVER */}
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                padding: '8px 12px',
                borderRadius: 10,
                border: '1px solid white',
                background: 'transparent',
                color: 'white',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              ← Volver
            </button>

            <h2 style={{ fontSize: 28 }}>{selected.name}</h2>
            <p>{selected.brand}</p>
            <p style={{ fontWeight: 'bold', fontSize: 18 }}>
              {selected.price}
            </p>

            {/* 🖼️ IMAGEN CENTRADA */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 30,
              }}
            >
              <img
                src={selected.image}
                style={{
                  width: 320,
                  maxWidth: '90%',
                  borderRadius: 12,
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
                cursor: 'pointer',
                width: 200,
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