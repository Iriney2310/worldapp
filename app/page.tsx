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
    image: 'https://m.media-amazon.com/images/I/61-3Bmcn-SL._AC_SY695_.jpg',
    link: 'https://amzn.to/3Px9aGX',
    badge: 'HOT',
  },
  
]

export default function Home() {
  const [selected, setSelected] = useState<Sneaker | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [view, setView] = useState<'shop' | 'fav'>('shop')

  const toggleFav = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    )
  }

  const dataToShow = useMemo(() => {
    if (view === 'fav') {
      return sneakers.filter(s => favorites.includes(s.id))
    }
    return sneakers
  }, [view, favorites])

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
      {/* 🏠 TOP NAV */}
      {!selected && (
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 34 }}>👟 Sneaker Market</h1>

          <div style={{ marginTop: 10 }}>
            <button
              onClick={() => setView('shop')}
              style={{
                marginRight: 10,
                padding: 10,
                borderRadius: 10,
                border: '1px solid white',
                background: 'transparent',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Tienda
            </button>

            <button
              onClick={() => setView('fav')}
              style={{
                padding: 10,
                borderRadius: 10,
                border: '1px solid white',
                background: 'transparent',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              ❤️ Favoritos ({favorites.length})
            </button>
          </div>
        </div>
      )}

      {/* 🏪 GRID */}
      {!selected && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
            marginTop: 30,
          }}
        >
          {dataToShow.map(s => (
            <div
              key={s.id}
              onClick={() => setSelected(s)}
              style={{
                position: 'relative',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 14,
                padding: 15,
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
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
                  toggleFav(s.id)
                }}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  fontSize: 18,
                  cursor: 'pointer',
                }}
              >
                {favorites.includes(s.id) ? '❤️' : '🤍'}
              </div>

              <img
                src={s.image}
                style={{ width: '100%', borderRadius: 10 }}
              />

              <h3 style={{ marginTop: 10 }}>{s.name}</h3>
              <p style={{ opacity: 0.8 }}>{s.brand}</p>
              <p style={{ fontWeight: 'bold' }}>{s.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* 👟 DETAIL FIXED */}
      {selected && (
        <div
          style={{
            maxWidth: 500,
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* BACK FIX */}
          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'absolute',
              top: -20,
              left: 0,
              padding: 8,
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

          {/* IMAGE CENTER FIX */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <img
              src={selected.image}
              style={{
                width: 300,
                borderRadius: 12,
              }}
            />
          </div>

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