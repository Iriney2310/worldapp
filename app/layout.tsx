import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import BottomNav from "./bottomnav"
import { useEffect } from "react"

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
  return (
    <html lang="es">
      <body id="app-body" style={{ paddingBottom: 80 }}>
        <ThemeLoader />
        {children}
        <BottomNav />
      </body>
    </html>
  )
}

/* 🔥 ESTE COMPONENTE APLICA EL TEMA GLOBAL */
function ThemeLoader() {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("theme")

    if (saved === "light") {
      document.getElementById("app-body")?.classList.add("light")
    } else {
      document.getElementById("app-body")?.classList.remove("light")
    }
  }

  return null
}