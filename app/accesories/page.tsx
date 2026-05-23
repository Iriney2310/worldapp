'use client'

import { accessories } from '../data/accessories'
import { useCurrency } from '../context/CurrencyContext'

export default function AccessoriesPage() {
  const { convert } = useCurrency()

  return (
    <div style={{ padding: 20 }}>
      <h1>🧢 Accesorios</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
        {accessories.map(item => (
          <div key={item.id}>
            <img src={item.image} style={{ width: '100%' }} />
            <h3>{item.name}</h3>
            <p>{convert(parseFloat(item.price))}</p>
          </div>
        ))}
      </div>
    </div>
  )
}