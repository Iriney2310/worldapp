'use client'

import { useState } from 'react'

type Sneaker = {
  name: string
  brand: string
  price: string
  image: string
  link: string
}

const sneakers: Sneaker[] = [
  {
    name: 'Nike Air Force 1',
    brand: 'Nike',
    price: '95,95€',
    image:
      'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/e777c881-5b62-4250-92a6-362967f54cca/WMNS+AIR+FORCE+1+%2707.png',
    link: 'https://www.amazon.es/dp/B08QB1YKTR?tag=iriney06-21',
  },
  {
    name: 'Nike Air Force 1',
    brand: 'Nike',
    price: '110€',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/air-force-1.jpg',
    link: 'https://www.amazon.es/s?k=nike+air+force+1',
  },
  {
    name: 'Jordan 1 Retro',
    brand: 'Nike',
    price: '180€',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/jordan-1.jpg',
    link: 'https://www.amazon.es/s?k=jordan+1+retro',
  },
]

export default function Home() {
  const [selected, setSelected] = useState<Sneaker | null>(null)

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
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <h1>👟 ¡SNEAKERS! 👟</h1>
            <p style={{ opacity: 0.7 }}>Las mejores zapatillas al mejor precio</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 20,
              marginTop: 20,
            }}
          >
            {sneakers.map((s, i) => (
              <div
                key={i}
                onClick={() => setSelected(s)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 12,
                  padding: 15,
                  cursor: 'pointer',
                }}
              >
                <img
                  src={s.image}
                  style={{
                    width: '100%',
                    borderRadius: 10,
                  }}
                />

                <h3>{s.name}</h3>
                <p>{s.brand}</p>
                <p style={{ opacity: 0.7 }}>{s.price}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 👟 DETALLE */}
      {selected && (
        <div
          style={{
            maxWidth: 500,
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            paddingTop: 10,
          }}
        >
          {/* ← BOTÓN VOLVER MEJOR POSICIONADO */}
          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'absolute',
              top: -10,
              left: 0,
              padding: 10,
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            ← Volver
          </button>

          <h2>{selected.name}</h2>
          <p>{selected.brand}</p>
          <p style={{ fontWeight: 'bold' }}>{selected.price}</p>

          {/* 🖼️ IMAGEN CENTRADA PERFECTAMENTE */}
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

          {/* 🛒 BOTÓN COMPRAR CENTRADO */}
          <div
            style={{
              marginTop: 30,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={() => window.open(selected.link, '_blank')}
              style={{
                padding: 14,
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                width: 200,
              }}
            >
              🛒 Comprar ahora
            </button>
          </div>

          <p style={{ marginTop: 10, opacity: 0.5, fontSize: 12 }}>
            *Los precios pueden variar según la disponibilidad y promociones.
          </p>
        </div>
      )}
    </main>
  )
}