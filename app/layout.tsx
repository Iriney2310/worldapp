import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { useEffect, useState } from "react"
import BottomNav from "./bottomnav"

const [darkMode, setDarkMode] = useState(true)

useEffect(() => {
  const theme = localStorage.getItem("theme")

  if (theme === "light") {
    document.getElementById("app-body")?.classList.add("light")
  }
}, [])

useEffect(() => {
  const theme = localStorage.getItem("theme")

  if (theme === "light") {
    document.getElementById("app-body")?.classList.add("light")
  }
}, [])

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist({
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
        {children}
        <BottomNav />
      </body>
    </html>
  )
}