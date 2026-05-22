"use client"

import { createContext, useContext, useEffect, useState } from "react"

type ThemeContextType = {
  dark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true)

  // cargar tema guardado
  useEffect(() => {
    const saved = localStorage.getItem("theme")

    if (saved === "light") {
      setDark(false)
      document.getElementById("app-body")?.classList.add("light")
    }
  }, [])

  const toggleTheme = () => {
    const body = document.getElementById("app-body")

    if (dark) {
      body?.classList.add("light")
      localStorage.setItem("theme", "light")
    } else {
      body?.classList.remove("light")
      localStorage.setItem("theme", "dark")
    }

    setDark(!dark)
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme debe usarse dentro de ThemeProvider")
  return ctx
}