'use client'

import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'

type Sneaker = {
  id: number
  name: string
  brand: string
  price: string
  image: string
  link: string
  badge?: 'NEW' | 'HOT' | 'BESTSELLER' | 'OFFER' | 'LIMITED'
}

const sneakers: Sneaker[] = [
  {
    id: 1,
    name: "Air Force 1 '07",
    brand: 'Nike',
    price: '95,95€',
    image:
      'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/e777c881-5b62-4250-92a6-362967f54cca/WMNS+AIR+FORCE+1+%2707.png',
    link: 'https://www.amazon.es/dp/B08QB1YKTR?tag=iriney06-21',
    badge: 'BESTSELLER',
  },
  {
    id: 2,
    name: 'Air Max Ltd 3',
    brand: 'Nike',
    price: '90,99€',
    image:
      'https://www.nespo.gr/wp-content/uploads/2023/03/687977-111-PHSLH000-2000_7.jpg',
    link: 'https://amzn.to/4nIiepg',
    badge: 'OFFER',
  },
  {
    id: 3,
    name: 'Court Vision Low',
    brand: 'Nike',
    price: '53,99€',
    image:
      'https://www.intersport.es/421984/zapatillas-court-vision-lo-iic.nike.fn4019.001.jpg',
    link: 'https://amzn.to/4die6c0',
    badge: 'NEW',
  },
  {
    id: 4,
    name: 'Grand Court Base 00s',
    brand: 'Adidas',
    price: '39,99€',
    image:
      'https://www.sportvision.ba/files/images/slike_proizvoda/media/IH6/IH6185/images/IH6185.jpg',
    link: 'https://amzn.to/3Px9aGX',
    badge: 'HOT',
  },
  {
    id: 5,
    name: 'VL Court 3.0',
    brand: 'Adidas',
    price: '41,99€',
    image:
      'https://http2.mlstatic.com/D_NQ_NP_784415-MLA79213189690_092024-O.webp',
    link: 'https://amzn.to/4nHqSUY',
    badge: 'HOT',
  },
]

export default function Home() {
  const [selected, setSelected] = useState<Sneaker | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [favOpen, setFavOpen] = useState(false)
  const [brand, setBrand] = useState<'all' | 'Nike' | 'Adidas'>('all')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [closing, setClosing] = useState(false)

  const filtered = useMemo(() => {
    return sneakers.filter(s => {
      const matchBrand = brand === 'all' || s.brand === brand
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.brand.toLowerCase().includes(search.toLowerCase())

      return matchBrand && matchSearch
    })
  }, [brand, search])

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    )
  }

  const favItems = sneakers.filter(s =>
    favorites.includes(s.id)
  )

  const closeDetail = () => {
    setClosing(true)
    setTimeout(() => {
      setSelected(null)
      setClosing(false)
    }, 200)
  }

  return (
    <main style={main}>

      {/* BACKGROUND */}
      <div style={bg} />
      <div style={overlayBg} />

      {/* BANNER */}
      {!selected && <div style={banner}>👟 ¡SNEAKERS! 🚚</div>}

      {/* TOP TEXT */}
      {!selected && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ opacity: 0.7, marginTop: 12 }}>
            LAS MEJORES ZAPATILLAS AL MEJOR PRECIO
          </p>

          <button onClick={() => setMenuOpen(true)} style={topLeftBtn}>
            ☰
          </button>

          <button onClick={() => setFavOpen(true)} style={topRightBtn}>
            ❤️ {favorites.length}
          </button>
        </div>
      )}

      {/* GRID */}
      {!selected && (
        <div style={grid}>
          {filtered.map(s => (
            <div key={s.id} style={card} onClick={() => setSelected(s)}>
              <div style={badge}>{s.badge}</div>

              <div
                style={heart}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(s.id)
                }}
              >
                {favorites.includes(s.id) ? '❤️' : '🤍'}
              </div>

              <img src={s.image} style={img} />
              <h3>{s.name}</h3>
              <p>{s.brand}</p>
              <p style={{ fontWeight: 'bold' }}>{s.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL */}
      {selected && (
        <div style={detail}>
          <button onClick={closeDetail} style={backBtn}>
            ← Volver
          </button>

          <h2>{selected.name}</h2>

          <img src={selected.image} style={{ width: 320 }} />

          <p>{selected.brand}</p>
          <p style={{ fontWeight: 'bold' }}>{selected.price}</p>

          <button
            onClick={() => window.open(selected.link, '_blank')}
            style={buyBtn}
          >
            🛒 VER EN AMAZON
          </button>
        </div>
      )}
    </main>
  )
}

/* ================= STYLES ================= */

const main: CSSProperties = {
  minHeight: '100vh',
  position: 'relative',
  color: 'white',
  fontFamily: 'sans-serif',
  overflow: 'hidden',
}

const bg: CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundImage: 'url("/fondo.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: -2,
}

const overlayBg: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.35)',
  zIndex: -1,
}

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
  gap: 16,
  marginTop: 20,
}

const card: CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  padding: 12,
  borderRadius: 20,
  cursor: 'pointer',
}

const img: CSSProperties = {
  width: '100%',
  borderRadius: 12,
}

const heart: CSSProperties = {
  position: 'absolute',
  right: 10,
  top: 10,
}

const badge: CSSProperties = {
  position: 'absolute',
  left: 10,
  top: 10,
  background: '#ffd600',
  color: 'black',
  padding: '4px 8px',
  borderRadius: 6,
}

const detail: CSSProperties = {
  textAlign: 'center',
  paddingTop: 60,
}

const backBtn: CSSProperties = {
  position: 'absolute',
  top: 10,
  left: 10,
}

const buyBtn: CSSProperties = {
  marginTop: 20,
  padding: 10,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
}

const banner: CSSProperties = {
  textAlign: 'center',
  marginTop: 10,
  fontSize: 24,
  fontWeight: 'bold',
}

const topLeftBtn: CSSProperties = {
  position: 'absolute',
  top: 10,
  left: 10,
}

const topRightBtn: CSSProperties = {
  position: 'absolute',
  top: 10,
  right: 10,
}