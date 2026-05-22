'use client'

import { useState } from "react"

export default function Sidebar() {
  const [openBrands, setOpenBrands] = useState(false)
  const [openStores, setOpenStores] = useState(false)

  return (
    <div
      style={{
        width: 260,
        height: "100vh",
        padding: 15,
        background: "var(--bg)",
        borderRight: "1px solid var(--border)",
        color: "var(--text)",
      }}
    >

      {/* MARCAS */}
      <button onClick={() => setOpenBrands(!openBrands)}>
        👟 Marcas
      </button>

      {openBrands && (
        <div style={{ paddingLeft: 10 }}>
          <p>Nike</p>
          <p>Adidas</p>
          <p>Puma</p>
        </div>
      )}

      {/* TIENDAS */}
      <button onClick={() => setOpenStores(!openStores)} style={{ marginTop: 20 }}>
        🛒 Tiendas
      </button>

      {openStores && (
        <div style={{ paddingLeft: 10 }}>
          <p>Amazon</p>
          <p>Mercado Libre</p>
        </div>
      )}

    </div>
  )
}