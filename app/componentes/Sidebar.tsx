'use client'

import type { CSSProperties } from 'react'

export default function Sidebar({
  menuOpen,
  setMenuOpen,
  search,
  setSearch,
  brand,
  setBrand,
  store,
  setStore,
  openBrands,
  setOpenBrands,
  openStores,
  setOpenStores,
  goHome,
  goAccessories
}: any) {

  return (
    <>
      {/* OVERLAY */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={overlay}
        />
      )}

      {/* SIDEBAR */}
      <div
        style={{
          ...sidebar,
          transform: menuOpen ? 'translateX(0)' : 'translateX(-110%)',
        }}
      >
        <button onClick={() => setMenuOpen(false)} style={sideBtn}>
          ✕ Cerrar
        </button>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔎 Buscar..."
          style={input}
        />

        {/* MARCAS */}
        <button onClick={() => setOpenBrands(!openBrands)} style={sideBtn}>
          👟 MARCAS {openBrands ? '▲' : '▼'}
        </button>

        {openBrands && (
          <div style={{ marginLeft: 10 }}>
            <button onClick={() => setBrand('all')} style={sideBtn}>Todas</button>
            <button onClick={() => setBrand('Nike')} style={sideBtn}>Nike</button>
            <button onClick={() => setBrand('Adidas')} style={sideBtn}>Adidas</button>
          </div>
        )}

        {/* TIENDAS */}
        <button onClick={() => setOpenStores(!openStores)} style={sideBtn}>
          🛒 TIENDAS {openStores ? '▲' : '▼'}
        </button>

        {openStores && (
  <div style={{ marginLeft: 10 }}>
    <button onClick={() => setStore('all')} style={sideBtn}>Todas</button>
    <button onClick={() => setStore('Amazon')} style={sideBtn}>Amazon</button>
    <button onClick={() => setStore('MercadoLibre')} style={sideBtn}>Mercado Libre</button>
    <button onClick={() => setStore('NewEra')} style={sideBtn}>New Era</button>
  </div>
)}

        <button onClick={goAccessories} style={sideBtn}>
          👝 ACCESORIOS
        </button>
      </div>
    </>
  )
}

/* STYLES */
const sidebar: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: 280,
  height: '100%',
  background: 'var(--bg)',
  padding: 20,
  zIndex: 9999,
  borderRight: '1px solid var(--border)',
  transition: '0.35s ease',
}

const sideBtn: CSSProperties = {
  display: 'block',
  marginTop: 10,
  padding: 10,
  width: '100%',
  borderRadius: 10,
  border: '1px solid var(--border)',
  background: 'var(--card)',
  color: 'var(--text)',
  cursor: 'pointer',
}

const input: CSSProperties = {
  width: '100%',
  padding: 10,
  marginTop: 10,
  borderRadius: 8,
  border: '1px solid var(--border)',
  background: 'var(--card)',
  color: 'var(--text)',
}

const overlay: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.3)',
  zIndex: 9998,
}