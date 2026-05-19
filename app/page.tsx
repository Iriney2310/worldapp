'use client'

import { useState } from 'react'

type Sneaker = {
  name: string
  brand: string
  price: string
  image: string
  url: string
}

const sneakers: Sneaker[] = [
  {
    name: 'Air Force 1',
    brand: 'Nike',
    price: '110€',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/air-force-1.jpg',
    url: 'https://www.nike.com/es/w/air-force-1-zapatillas-5sj3yzy7ok'
  },
  {
    name: 'Jordan 1 Retro',
    brand: 'Nike',
    price: '180€',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto/jordan-1.jpg',
    url: 'https://www.nike.com/es/w/jordan-zapatillas-37eefzy7ok'
  },
  {
    name: 'Adidas Samba',
    brand: 'Adidas',
    price: '100€',
    image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/samba.jpg',
    url: 'https://www.adidas.es/samba'
  },
  {
    name: 'Yeezy Boost 350',
    brand: 'Adidas',
    price: '220€',
    image: 'https://assets.adidas.com/images/w_600/yeezy.jpg',
    url: 'https://www.adidas.es/yeezy'
  },
  {
    name: 'Air Max 270',
    brand: 'Nike',
    price: '150€',
    image: 'https://static.nike.com/a/images/air-max-270.jpg',
    url: 'https://www.nike.com/es/w/air-max-270'
  }
]

export default function Home() {
  const [selected, setSelected] = useState<Sneaker | null>(null)

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0f0f0f',
        color: 'white',
        fontFamily: 'sans-serif',
        padding: 30,
      }}
    >
      <h1>👟 Sneaker Store</h1>
      <p>Haz click en una zapatilla para verla en tienda</p>

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
                padding: 15,
                borderRadius: 12,
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <img
                src={s.image}
                alt={s.name}
                style={{ width: '100%', borderRadius: 10 }}
              />
              <h3>{s.name}</h3>
              <p>{s.brand}</p>
              <p>{s.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            marginTop: 40,
            textAlign: 'center',
          }}
        >
          <h2>{selected.name}</h2>
          <p>{selected.brand}</p>
          <p>{selected.price}</p>

          <img
            src={selected.image}
            style={{ width: 300, borderRadius: 12 }}
          />

          <div style={{ marginTop: 20 }}>
            <button
              onClick={() => window.open(selected.url, '_blank')}
              style={{
                padding: 14,
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginRight: 10,
              }}
            >
              🛒 Ver en tienda
            </button>

            <button
              onClick={() => setSelected(null)}
              style={{
                padding: 14,
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              ← Volver
            </button>
          </div>
        </div>
      )}
    </main>
  )
}