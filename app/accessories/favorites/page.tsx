'use client'

import { useFavorites } from '../../context/FavoritesContext'
import { accessories } from '../../data/accessories'

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  const items = accessories.filter((a) =>
    favorites.includes(a.id)
  )

  return (
    <main style={{ padding: 20 }}>
      <h1>❤️ Favoritos</h1>

      {items.length === 0 ? (
        <p>No tienes favoritos aún</p>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {items.map((item) => (
            <div key={item.id}>
              <img src={item.image} width={120} />
              <h3>{item.name}</h3>
              <p>{item.brand}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}