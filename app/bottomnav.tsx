"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BottomNav() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <div style={bottomNav}>
      <Link
        href="/favoritos"
        style={{
          ...navBtn,
          ...(isActive("/favoritos") ? activeBtn : {}),
        }}
      >
        ❤️
        <span>Favoritos</span>
      </Link>

      <Link
        href="/"
        style={{
          ...navBtn,
          ...(isActive("/") ? activeBtn : {}),
        }}
      >
        🏠
        <span>Inicio</span>
      </Link>

      <Link
        href="/perfil"
        style={{
          ...navBtn,
          ...(isActive("/perfil") ? activeBtn : {}),
        }}
      >
        👤
        <span>Perfil</span>
      </Link>
    </div>
  )
}

const bottomNav: React.CSSProperties = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  height: 70,
  background: "rgba(15,15,15,0.9)",
  backdropFilter: "blur(10px)",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  borderTop: "1px solid rgba(255,255,255,0.1)",
  zIndex: 9999,
}

const navBtn: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  fontSize: 13,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
}

const activeBtn: React.CSSProperties = {
  transform: "scale(1.15)",
  transformOrigin: "center",
  background: "rgba(255,255,255,0.08)",
  padding: "6px 10px",
  borderRadius: 12,
}