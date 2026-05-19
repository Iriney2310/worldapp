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
    price: '110€',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/air-force-1.jpg',
    link: 'https://www.amazon.es/s?k=nike+air+force+1'
  },
  {
    name: 'Jordan 1 Retro',
    brand: 'Nike',
    price: '180€',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/jordan-1.jpg',
    link: 'https://www.amazon.es/s?k=jordan+1+retro'
  },
  {
    name: 'Adidas Samba',
    brand: 'Adidas',
    price: '100€',
    image: 'https://assets.adidas.com/images/w_600/samba.jpg',
    link: 'https://www.amazon.es/s?k=adidas+samba'
  },
  {
    name: 'Nike Air Max 270',
    brand: 'Nike',
    price: '150€',
    image: 'https://static.nike.com/a/images/air-max-270.jpg',
    link: 'https://www.amazon.es/s?k=air+max+270'
  }
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
        padding: 30,
      }}
    >
      <h1>👟 Sneaker Deals</h1>
      <p>Compra zapatillas con enlaces afiliados</p>

      {!selected ? (
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
      ) : (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <h2>{selected.name}</h2>
          <p>{selected.brand}</p>
          <p>{selected.price}</p>

          <img
            src={selected.image}
            style={{ width: 300, borderRadius: 12 }}
          />

          <div style={{ marginTop: 20 }}>
            <button
              onClick={() => window.open(selected.link, '_blank')}
              style={{
                padding: 14,
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              🛒 Comprar ahora
            </button>

            <button
              onClick={() => setSelected(null)}
              style={{
                marginLeft: 10,
                padding: 14,
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              ← Volver
            </button>
          </div>

          <p style={{ marginTop: 10, opacity: 0.5, fontSize: 12 }}>
            Enlace de afiliado (Amazon)
          </p>
        </div>
      )}
    </main>
  )
}