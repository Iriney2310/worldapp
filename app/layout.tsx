"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BottomNav() {
  const pathname = usePathname()

  const isHome = pathname === "/"
  const isFav = pathname === "/favoritos"
  const isProfile = pathname === "/perfil"

  return (
    <div style={bottomNav}>
      <Link href="/" style={{ ...navBtn, color: isHome ? "#00ff99" : "white" }}>
        🏠<span>Inicio</span>
      </Link>

      <Link href="/favoritos" style={{ ...navBtn, color: isFav ? "#00ff99" : "white" }}>
        ❤️<span>Favoritos</span>
      </Link>

      <Link href="/perfil" style={{ ...navBtn, color: isProfile ? "#00ff99" : "white" }}>
        👤<span>Perfil</span>
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
}

const navBtn: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  textDecoration: "none",
  fontSize: 13,
  color: "white",
}