"use client"

import { createContext, useContext, useEffect, useState } from "react"

type ThemeContextType = {
  dark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true)

  // 👇 aplica tema SIEMPRE al cambiar dark
  useEffect(() => {
    const body = document.body

    if (dark) {
      body.classList.remove("light")
      localStorage.setItem("theme", "dark")
    } else {
      body.classList.add("light")
      localStorage.setItem("theme", "light")
    }
  }, [dark])

  // 👇 cargar al iniciar app
  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "light") {
      setDark(false)
    }
  }, [])

  const toggleTheme = () => {
    setDark(prev => !prev)
  }

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