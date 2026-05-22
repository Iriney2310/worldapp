"use client"

import { createContext, useContext, useEffect, useState } from "react"

type ThemeContextType = {
  dark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState<boolean | null>(null)

  // 🔥 1. Cargar tema al iniciar app (solo una vez)
  useEffect(() => {
    const saved = localStorage.getItem("theme")

    const isDark = saved ? saved === "dark" : true

    setDark(isDark)

    if (isDark) {
      document.body.classList.remove("light")
    } else {
      document.body.classList.add("light")
    }
  }, [])

  // 🔥 2. Aplicar cambios cuando dark cambie
  useEffect(() => {
    if (dark === null) return

    if (dark) {
      document.body.classList.remove("light")
      localStorage.setItem("theme", "dark")
    } else {
      document.body.classList.add("light")
      localStorage.setItem("theme", "light")
    }
  }, [dark])

  const toggleTheme = () => {
    setDark(prev => {
      if (prev === null) return false
      return !prev
    })
  }

  // 🔥 evita render incorrecto antes de cargar localStorage
  if (dark === null) return null

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider")
  return ctx
}