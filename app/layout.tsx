import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import BottomNav from "./bottomnav"
import { ThemeProvider } from "./context/ThemeContext"
import { CurrencyProvider } from "./context/CurrencyContext"

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
      >
        <ThemeProvider>
          <CurrencyProvider>

            <div
              style={{
                minHeight: "100vh",
                paddingBottom: 90,
              }}
            >
              {children}
            </div>

            <BottomNav />

          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}