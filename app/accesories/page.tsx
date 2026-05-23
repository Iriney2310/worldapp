'use client'

import { useCurrency } from "../context/CurrencyContext"
import { products } from "../data/accessories"

export default function AccessoriesPage() {
  const { convert } = useCurrency()

  return (
    <main style={{ padding: 20 }}>
      <h1>🧢 Accesorios</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
        {products.map((item) => (
          <div key={item.id} style={{ padding: 12, borderRadius: 12, background: "var(--card)" }}>
            <img src={item.image} style={{ width: "100%", borderRadius: 10 }} />

            <h3>{item.name}</h3>

            <p style={{ fontWeight: "bold" }}>
              {convert(parseFloat(item.price))}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}