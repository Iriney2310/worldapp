import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import BottomNav from "./bottomnav"
import { ThemeProvider } from "./context/ThemeContext"
import Sidebar from "./components/Sidebar"

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
      <body
        id="app-body"
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          margin: 0,
          display: "flex",
          minHeight: "100vh",
          paddingBottom: 80,
        }}
      >

        {/* 🔥 THEME GLOBAL */}
        <ThemeProvider>

          {/* 🔥 SIDEBAR IZQUIERDA */}
          <Sidebar />

          {/* 🔥 CONTENIDO PRINCIPAL */}
          <main style={{ flex: 1 }}>
            {children}
          </main>

          {/* 🔥 BOTTOM NAV */}
          <BottomNav />

        </ThemeProvider>

      </body>
    </html>
  )
}