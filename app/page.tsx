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

  const filtered = useMemo(() => {
    if (brand === 'all') return sneakers
    return sneakers.filter(s => s.brand === brand)
  }, [brand])

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
            top: 10,
            left: 8,
            padding: 5,
            borderRadius: 8,
            border: '1px solid white',
            background: 'transparent',
            color: 'white',
            cursor: 'pointer',
            fontSize: 15,
          }}
        >
          ☰
        </button>
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
            borderRight: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              marginBottom: 20,
              padding: 8,
              borderRadius: 8,
              border: '1px solid white',
              background: 'transparent',
              color: 'white',
              cursor: 'pointer',
            }}
          >
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

      {/* 🏠 HOME */}
      {!selected && (
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <h1 style={{ fontSize: 34 }}>SNEAKERS</h1>

          <p style={{ opacity: 0.7 }}>
            ¡Las mejores zapatillas al mejor precio!
          </p>
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
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
                transition: '0.2s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.03)'
                e.currentTarget.style.boxShadow =
                  '0 10px 30px rgba(0,0,0,0.5)'
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
            paddingTop: 70,
            position: 'relative',
          }}
        >
          {/* ← VOLVER */}
          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              padding: 6,
              borderRadius: 8,
              border: '1px solid white',
              background: 'transparent',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            ← Volver
          </button>

          {/* TITULO */}
          <h2 style={{ fontSize: 32, marginBottom: 5 }}>
            {selected.name}
          </h2>

          <p style={{ opacity: 0.7 }}>{selected.brand}</p>

          <p
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              marginTop: 10,
            }}
          >
            {selected.price}
          </p>

          {/* ⭐ INFO EXTRA */}
          <div style={{ marginTop: 10 }}>
            <p style={{ color: '#ffd600', fontSize: 18 }}>
              ★★★★★{' '}
              <span
                style={{
                  color: 'white',
                  fontSize: 14,
                }}
              >
                (184 reviews)
              </span>
            </p>

            <p
              style={{
                color: '#00e676',
                fontWeight: 'bold',
              }}
            >
              ✅ En stock
            </p>

            <p style={{ opacity: 0.8 }}>
              🚚 Envío GRATIS mañana
            </p>

            <p
              style={{
                marginTop: 15,
                opacity: 0.7,
                lineHeight: 1.5,
                padding: '0 20px',
              }}
            >
              Zapatilla premium con diseño urbano y máxima comodidad
              para uso diario.
            </p>
          </div>

          {/* 🖼️ IMAGEN */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 25,
              width: '100%',
            }}
          >
            <img
              src={selected.image}
              style={{
                width: 300,
                borderRadius: 12,
                objectFit: 'contain',
              }}
            />
          </div>

          {/* 🛒 COMPRAR */}
          <button
            onClick={() => window.open(selected.link, '_blank')}
            style={{
              marginTop: 30,
              padding: 14,
              borderRadius: 12,
              border: '1px solid white',
              background: 'transparent',
              color: 'white',
              cursor: 'pointer',
              width: 220,
              fontWeight: 'bold',
              transition: '0.2s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            🛒 Comprar ahora
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