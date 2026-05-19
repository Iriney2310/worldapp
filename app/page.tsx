'use client'

import { useState } from 'react'

type Sneaker = {
  name: string
  brand: string
  price: string
  image: string
  link: string
  badge?: 'NEW' | 'HOT' | 'BESTSELLER'
}

const sneakers: Sneaker[] = [
  {
    name: 'Nike Air Force 1',
    brand: 'Nike',
    price: '95,95€',
    image:
      'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/e777c881-5b62-4250-92a6-362967f54cca/WMNS+AIR+FORCE+1+%2707.png',
    link: 'https://www.amazon.es/dp/B08QB1YKTR?tag=iriney06-21',
    badge: 'BESTSELLER',
  },
  {
    name: 'Nike Air Force 1',
    brand: 'Nike',
    price: '110€',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/air-force-1.jpg',
    link: 'https://www.amazon.es/s?k=nike+air+force+1',
    badge: 'HOT',
  },
  {
    name: 'Jordan 1 Retro',
    brand: 'Nike',
    price: '180€',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/jordan-1.jpg',
    link: 'https://www.amazon.es/s?k=jordan+1+retro',
    badge: 'NEW',
  },
]

export default function Home() {
  const [selected, setSelected] = useState<Sneaker | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [filter, setFilter] = useState<string>('All')

  const brands = ['All', ...Array.from(new Set(sneakers.map(s => s.brand)))]

  const filtered = sneakers.filter(
    s => filter === 'All' || s.brand === filter
  )

  const toggleFav = (name: string) => {
    setFavorites(prev =>
      prev.includes(name)
        ? prev.filter(f => f !== name)
        : [...prev, name]
    )
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0b0b0b',
        color: 'white',
        fontFamily: 'sans-serif',
        padding: 20,
      }}
    >
      {/* 🏠 HOME */}
      {!selected && (
        <>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 34 }}>👟 Sneaker Market</h1>
            <p style={{ opacity: 0.7 }}>
              Marketplace de zapatillas
            </p>
          </div>

          {/* FILTERS */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 10,
              marginTop: 20,
              flexWrap: 'wrap',
            }}
          >
            {brands.map(b => (
              <button
                key={b}
                onClick={() => setFilter(b)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 10,
                  border:
                    filter === b
                      ? '1px solid white'
                      : '1px solid rgba(255,255,255,0.2)',
                  background: 'transparent',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                {b}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 20,
              marginTop: 30,
            }}
          >
            {filtered.map((s, i) => (
              <div
                key={i}
                onClick={() => setSelected(s)}
                style={{
                  position: 'relative',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 14,
                  padding: 15,
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: '0.2s',
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = 'scale(1.03)')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = 'scale(1)')
                }
              >
                {/* BADGE */}
                {s.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      padding: '5px 10px',
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 'bold',
                      background:
                        s.badge === 'NEW'
                          ? '#00c853'
                          : s.badge === 'HOT'
                          ? '#ff3d00'
                          : '#ffd600',
                      color: 'black',
                    }}
                  >
                    {s.badge}
                  </div>
                )}

                {/* FAVORITO */}
                <div
                  onClick={e => {
                    e.stopPropagation()
                    toggleFav(s.name)
                  }}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    cursor: 'pointer',
                    fontSize: 18,
                  }}
                >
                  {favorites.includes(s.name) ? '❤️' : '🤍'}
                </div>

                <img
                  src={s.image}
                  style={{
                    width: '100%',
                    borderRadius: 10,
                  }}
                />

                <h3 style={{ margin: '10px 0 5px', fontSize: 18 }}>
                  {s.name}
                </h3>
                <p style={{ opacity: 0.8 }}>{s.brand}</p>
                <p style={{ fontWeight: 'bold' }}>{s.price}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 👟 DETAIL */}
      {selected && (
        <div
          style={{
            maxWidth: 500,
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              padding: 10,
              borderRadius: 10,
              border: '1px solid white',
              background: 'transparent',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            ← Volver
          </button>

          <h2 style={{ fontSize: 28 }}>{selected.name}</h2>
          <p>{selected.brand}</p>
          <p style={{ fontWeight: 'bold', fontSize: 18 }}>
            {selected.price}
          </p>

          <img
            src={selected.image}
            style={{ width: 300, borderRadius: 12, marginTop: 20 }}
          />

          <div style={{ marginTop: 30 }}>
            <button
              onClick={() => window.open(selected.link, '_blank')}
              style={{
                padding: 14,
                borderRadius: 10,
                border: '1px solid white',
                background: 'transparent',
                color: 'white',
                cursor: 'pointer',
                width: 200,
              }}
            >
              🛒 Comprar ahora
            </button>
          </div>
        </div>
      )}
    </main>
  )
}