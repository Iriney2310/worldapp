'use client'

import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'

type Sneaker = {
  id: number
  name: string
  brand: string
  price: string
  oldPrice?: string
  image: string
  link: string
  rating: string
  usage: string
  stock: string
  tags?: string[]
  badge?: 'NEW' | 'HOT' | 'BESTSELLER'| 'OFFER' | 'LIMITED'
  
}

const sneakers: Sneaker[] = [
  {
    id: 1,
    name: 'Air Force 1 \'07',
    brand: 'Nike',
    price: '95,95€',
    image:
      'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/e777c881-5b62-4250-92a6-362967f54cca/WMNS+AIR+FORCE+1+%2707.png',
    link: 'https://www.amazon.es/dp/B08QB1YKTR?tag=iriney06-21',
    badge: 'BESTSELLER',
    rating: "4.5 / 5",
  usage: "Daily",
  stock: "Ultimas Unidades"
  },
  {
    id: 2,
    name: 'Air Max Ltd 3',
    brand: 'Nike',
    price: '90,99€',
    oldPrice: '129,99€',
    image:
      'https://www.nespo.gr/wp-content/uploads/2023/03/687977-111-PHSLH000-2000_7.jpg',
    link: 'https://amzn.to/4nIiepg',
    badge: 'OFFER',
    rating: "4.0 / 5",
    tags: ['-30%'],
    usage: "Daily",
    stock: "Pocas Unidades"
  },
  {
    id: 3,
    name: 'Court Vision Low',
    brand: 'Nike',
    price: 'Desde 53,99€',
    image:
      'https://www.intersport.es/421984/zapatillas-court-vision-lo-iic.nike.fn4019.001.jpg',
    link: 'https://amzn.to/4die6c0',
    badge: 'NEW',
    rating: "4.4 / 5",
  usage: "Daily / Lifestyle",
  stock: "En Stock"
  },
  {
    id: 4,
    name: 'Grand Court Base 00s',
    brand: 'Adidas',
    price: 'Desde 39,99€',
    image:
      'https://www.sportvision.ba/files/images/slike_proizvoda/media/IH6/IH6185/images/IH6185.jpg',
    link: 'https://amzn.to/3Px9aGX',
    badge: 'HOT',
    rating: "4.4 / 5",
  usage: "Daily / Lifestyle",
  stock: "En Stock"
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
    rating: "4.5 / 5",
  usage: "Football / Lifestyle",
  stock: "En Stock"
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
      <div style={bg} />
<div style={overlayBg} />
{/* BANNER */}
{!selected && (
  <div style={banner}>
    ¡SNEAKERS!
  </div>
)}
      {/* TOP BAR */}
      {!selected && (
        <div style={{ textAlign: 'center' }}>
          
          <p style={{ opacity: 0.5, marginTop: 10 }}>
            ¡TUS SNEAKERS AL MEJOR PRECIO!
          </p>

          <button onClick={() => setMenuOpen(true)} style={topLeftBtn}>
            ☰
          </button>

          <button onClick={() => setFavOpen(true)} style={topRightBtn}>
            ❤️ {favorites.length}
          </button>
        </div>
      )}

      {/* OVERLAY */}
      {(menuOpen || favOpen) && (
        <div
          onClick={() => {
            setMenuOpen(false)
            setFavOpen(false)
          }}
          style={{
            ...overlay,
            opacity: 1,
            transition: '0.25s ease',
          }}
        />
      )}

      {/* SIDEBAR */}
      <div
        style={{
          ...sidebar,
          transform: menuOpen ? 'translateX(0)' : 'translateX(-110%)',
          transition: '0.35s cubic-bezier(0.2,0.8,0.2,1)',
        }}
      >
        <button onClick={() => setMenuOpen(false)} style={sideBtn}>
          ✕ Cerrar
        </button>

        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔎 Buscar..."
          style={input}
        />

        <button onClick={() => setBrand('all')} style={sideBtn}>Todas</button>
        <button onClick={() => setBrand('Nike')} style={sideBtn}>Nike</button>
        <button onClick={() => setBrand('Adidas')} style={sideBtn}>Adidas</button>
      </div>

      {/* FAVORITOS */}
      <div
        style={{
          ...favPanel,
          transform: favOpen ? 'translateX(0)' : 'translateX(110%)',
          transition: '0.35s cubic-bezier(0.2,0.8,0.2,1)',
        }}
      >
        <button onClick={() => setFavOpen(false)} style={sideBtn}>
          ✕ Cerrar Favoritos
        </button>

        {favItems.length === 0 && (
          <p style={{ opacity: 0.6 }}>No tienes favoritos</p>
        )}

        {favItems.map(item => (
          <div
            key={item.id}
            style={favCard}
            onClick={() => setSelected(item)}
          >
            <img src={item.image} style={favImg} />
            <p>{item.name}</p>

            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(item.id)
              }}
              style={removeBtn}
            >
              Quitar
            </button>
          </div>
        ))}
      </div>

      {/* GRID */}
{!selected && (
  <div style={grid}>
    {filtered.map((s) => (
      <div
        key={s.id}
        style={card}
        onMouseEnter={(e) => {
       e.currentTarget.style.transform = 'translateY(-12px) scale(1.06)'
       e.currentTarget.style.boxShadow = '0 30px 70px rgba(0,0,0,0.7)'
      e.currentTarget.style.transition = '0.25s ease'
      }}
        onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)'
     e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)'
      }}
        onClick={() => setSelected(s)}
      >
        {s.badge && <div style={badge}>{s.badge}</div>}

        <div
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(s.id)
          }}
          style={heart}
        >
          {favorites.includes(s.id) ? '❤️' : '🤍'}
        </div>
{s.tags?.map((tag, i) => (
  <span
    key={i}
    style={{
      position: 'absolute',
      top: 8,
      left: 60 + i * 60,
      fontSize: 10,
      padding: '3px 8px',
      borderRadius: 6,
      background: tag.includes('%')
        ? '#ff3b30'
        : '#111',
      color: 'white',
      fontWeight: 'bold',
      border: '1px solid rgba(255,255,255,0.2)',
    }}
  >
    {tag}
  </span>
))}
        <img src={s.image} style={img} />

        <h3>{s.name}</h3>
        <p>{s.brand}</p>
        <div style={{ marginTop: 6 }}>
  {/* precio actual */}
  <p style={{ fontWeight: 'bold', fontSize: 16 }}>
    {s.price}
  </p>

  {/* precio antiguo tachado */}
  <p
  style={{
    textDecoration: 'line-through',
    color: '#fff',   // 👈 blanco
    fontSize: 15,
    fontWeight: 200,
    opacity: 1,
  }}
>
  {s.oldPrice}
</p>

</div>
      </div>
    ))}
  </div>
)}

      {/* DETAIL */}
{/* DETAIL */}
{selected && (
  <div
    style={{
      ...detail,
      opacity: closing ? 0 : 1,
      transform: closing
        ? 'translateY(10px) scale(0.98)'
        : 'translateY(0) scale(1)',
      transition: '0.15s ease',
    }}
  >
    {/* BOTÓN VOLVER */}
    <button onClick={closeDetail} style={backBtn}>
      ← Volver
    </button>

    {/* TITULO */}
    <h2
  style={{
    marginTop: 40,
    fontSize: 34,
    fontWeight: 800,
    letterSpacing: '-0.5px',
    textAlign: 'center',
    background: 'linear-gradient(90deg, #ffffff, #bdbdbd)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}
>
  {selected.name}
</h2>

    {/* IMAGEN */}
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src={selected.image}
        style={{
          width: 360,
          borderRadius: 18,
          objectFit: 'contain',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        }}
      />
    </div>

    {/* INFO */}
<div style={{ marginTop: 22, textAlign: 'center' }}>
  
  <p style={{ fontSize: 16, opacity: 0.8 }}>
    Marca: <b>{selected.brand}</b>
  </p>

  <p style={{ fontSize: 20, marginTop: 8 }}>
    Precio: <b>{selected.price}</b>
  </p>

  {/* NUEVO: VALORACIÓN */}
  <p style={{ fontSize: 16, marginTop: 10 }}>
    ⭐ Valoración: <b>{selected.rating}</b>
  </p>

  {/* NUEVO: USO */}
  <p style={{ fontSize: 16, marginTop: 6, opacity: 0.85 }}>
    👟 Uso: <b>{selected.usage}</b>
  </p>

  {/* NUEVO: STOCK */}
  <p style={{ fontSize: 14, marginTop: 6 }}>
  📦 Estado:{' '}

  <b
    style={{
      color:
        selected.stock.includes('En stock')
          ? '#00ff99'
          : selected.stock.includes('Pocas')
          ? 'orange'
          : selected.stock.includes('Últimas')
          ? 'red'
          : '#ccc',
    }}
  >
    {selected.stock}
  </b>
</p>
</div>

    {/* BOTÓN */}
    <button
      onClick={() => window.open(selected.link, '_blank')}
      style={{
        ...buyBtn,
        marginTop: 28,
        padding: '14px 22px',
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 14,
        background: 'linear-gradient(90deg, #ff00cc, #3333ff)',
        border: 'none',
      }}
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

/* fondo real */
const bg: CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundImage: 'url("/fondo.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  zIndex: -2,
  transform: 'scale(1.05)',
}

/* capa elegante tipo Nike (MUY suave) */
const overlayBg: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.25)',
  zIndex: -1,
}

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
  gap: 16,
  marginTop: 25,
}

const card: CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  padding: 12,
  borderRadius: 22,
  position: 'relative',
  cursor: 'pointer',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
  overflow: 'hidden',
}

const img: CSSProperties = {
  width: '100%',
  borderRadius: 12,
}

const heart: CSSProperties = {
  position: 'absolute',
  top: 10,
  right: 10,
  cursor: 'pointer',
}

const badge: CSSProperties = {
  position: 'absolute',
  top: 8,
  left: 8,
  fontSize: 10,
  padding: '4px 8px',
  borderRadius: 6,
  background: '#ffd600',
  color: 'black',
  fontWeight: 'bold',
}

const detail: CSSProperties = {
  maxWidth: 500,
  margin: '0 auto',
  textAlign: 'center',
  paddingTop: 100,

  position: 'relative',
  zIndex: 1,

  backdropFilter: 'blur(6px)',
  background: 'rgba(0,0,0,0.15)',
  borderRadius: 20,
  padding: 20,
}

const backBtn: CSSProperties = {
  position: 'absolute',
  top: 10,
  left: 10,
  padding: '10px 16px',
  fontSize: 14,
  borderRadius: 999,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
}

const buyBtn: CSSProperties = {
  marginTop: 20,
  padding: 12,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  borderRadius: 10,
}

const sidebar: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: 280,
  height: '100%',
  background: '#111',
  padding: 20,
  zIndex: 9999,
}

const favPanel: CSSProperties = {
  position: 'fixed',
  top: 0,
  right: 0,
  width: 300,
  height: '100%',
  background: '#111',
  padding: 20,
  zIndex: 9999,
}

const favCard: CSSProperties = {
  marginTop: 10,
  padding: 8,
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: 10,
  cursor: 'pointer',
}

const favImg: CSSProperties = {
  width: '100%',
  borderRadius: 8,
}

const removeBtn: CSSProperties = {
  marginTop: 5,
  width: '100%',
  padding: 6,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
}

const overlay: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.2)',
  zIndex: 9998,
}

const topLeftBtn: CSSProperties = {
  position: 'absolute',
  top: 10,
  left: 13,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  padding: '3px 14px',  // 👈 más ancho y alto
  fontSize: 20,          // 👈 icono más grande
  borderRadius: 5,
}

const topRightBtn: CSSProperties = {
  position: 'absolute',
  top: 10,
  right: 10,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  padding: 6,
  borderRadius: 5,
}

const sideBtn: CSSProperties = {
  display: 'block',
  marginTop: 10,
  padding: 10,
  width: '100%',
  borderRadius: 10,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
}

const input: CSSProperties = {
  width: '100%',
  padding: 10,
  marginTop: 10,
  borderRadius: 8,
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
}
const banner: CSSProperties = {
  width: 'fit-content',
  maxWidth: '100%',
  margin: '3px auto',
  marginTop: 12,
  padding: '6px 16px',
  borderRadius: 12,
  textAlign: 'center',
  fontSize: 25,
  fontWeight: 'bold',
  color: 'white',
  background: 'linear-gradient(90deg, #ff00cc, #3333ff)',
  lineHeight: 1.5,
}