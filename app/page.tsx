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
  {
    id: 3,
    name: 'Nike Jordan 1 Retro',
    brand: 'Nike',
    price: '180€',
    image:
      'https://static.nike.com/a/images/t_PDP_1728_v1/jordan-1.jpg',
    link: 'https://www.amazon.es/s?k=jordan+1+retro',
    badge: 'NEW',
  },
]

export default function Home() {
  const [selected, setSelected] = useState<Sneaker | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [view, setView] = useState<'shop' | 'fav'>('shop')
  const [search, setSearch] = useState('')
  const [brand, setBrand] = useState<'all' | 'Nike' | 'Adidas'>('all')

  const toggleFav = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    )
  }

  const filtered = useMemo(() => {
    let data = sneakers

    // filtro favoritos
    if (view === 'fav') {
      data = data.filter(s => favorites.includes(s.id))
    }

    // filtro marca
    if (brand !== 'all') {
      data = data.filter(s => s.brand === brand)
    }

    // buscador
    if (search.trim()) {
      data = data.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    return data
  }, [view, brand, search, favorites])

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
      {/* HEADER */}
      {!selected && (
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 34 }}>👟 SNEAKERS STORE</h1>

          {/* SEARCH */}
          <input
            placeholder="Buscar zapatillas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              marginTop: 10,
              padding: 10,
              width: 250,
              borderRadius: 10,
              border: '1px solid white',
              background: 'transparent',
              color: 'white',
            }}
          />

          {/* FILTERS */}
          <div style={{ marginTop: 10 }}>
            <button onClick={() => setBrand('all')} style={btnStyle}>
              Todas
            </button>
            <button onClick={() => setBrand('Nike')} style={btnStyle}>
              Nike
            </button>
            <button onClick={() => setBrand('Adidas')} style={btnStyle}>
              Adidas
            </button>
          </div>

          {/* VIEW */}
          <div style={{ marginTop: 10 }}>
            <button onClick={() => setView('shop')} style={btnStyle}>
              Tienda
            </button>
            <button onClick={() => setView('fav')} style={btnStyle}>
              ❤️ Favoritos ({favorites.length})
            </button>
          </div>
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
                position: 'relative',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 16,
                padding: 12,
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: '0.2s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.03)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
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

              {/* FAVORITO */}
              <div
                onClick={e => {
                  e.stopPropagation()
                  toggleFav(s.id)
                }}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  cursor: 'pointer',
                }}
              >
                {favorites.includes(s.id) ? '❤️' : '🤍'}
              </div>

              <img
                src={s.image}
                style={{
                  width: '100%',
                  borderRadius: 12,
                  marginBottom: 8,
                }}
              />

              <h3 style={{ fontSize: 14 }}>{s.name}</h3>
              <p style={{ opacity: 0.7, fontSize: 12 }}>{s.brand}</p>
              <p style={{ fontWeight: 'bold' }}>{s.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL */}
      {selected && (
        <div
          style={{
            maxWidth: 500,
            margin: '0 auto',
            textAlign: 'center',
            paddingTop: 60,
          }}
        >
          <button onClick={() => setSelected(null)} style={btnStyle}>
            ← Volver
          </button>

          <h2 style={{ fontSize: 30 }}>{selected.name}</h2>
          <p>{selected.brand}</p>
          <p style={{ fontWeight: 'bold' }}>{selected.price}</p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={selected.image}
              style={{ width: 300, borderRadius: 12 }}
            />
          </div>

          <button
            onClick={() => window.open(selected.link, '_blank')}
            style={{
              marginTop: 20,
              padding: 14,
              borderRadius: 12,
              border: '1px solid white',
              background: 'transparent',
              color: 'white',
              cursor: 'pointer',
              width: 200,
            }}
          >
            🛒 Comprar
          </button>
        </div>
      )}
    </main>
  )
}

const btnStyle = {
  margin: 5,
  padding: 8,
  borderRadius: 10,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  cursor: 'pointer',
}