"use client"

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { usePathname } from "next/navigation"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Sneakers App",
  description: "Tu app de zapatillas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isHome = pathname === "/"
  const isFav = pathname === "/favoritos"
  const isProfile = pathname === "/perfil"

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ paddingBottom: 80 }}>

        {children}

        {/* NAVBAR INFERIOR */}
        <div style={bottomNav}>
          
          <Link
            href="/favoritos"
            style={{
              ...navBtn,
              color: isFav ? "#00ff99" : "white",
              transform: isFav ? "scale(1.1)" : "scale(1)",
            }}
          >
            ❤️
            <span>Favoritos</span>
          </Link>

          <Link
            href="/"
            style={{
              ...navBtn,
              color: isHome ? "#00ff99" : "white",
              transform: isHome ? "scale(1.1)" : "scale(1)",
            }}
          >
            🏠
            <span>Inicio</span>
          </Link>

          <Link
            href="/perfil"
            style={{
              ...navBtn,
              color: isProfile ? "#00ff99" : "white",
              transform: isProfile ? "scale(1.1)" : "scale(1)",
            }}
          >
            👤
            <span>Perfil</span>
          </Link>

        </div>

      </body>
    </html>
  )
}

/* ================= NAVBAR STYLES ================= */

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
  transition: "0.2s ease",
}