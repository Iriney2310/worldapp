'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type Currency = 'EUR' | 'USD' | 'ARS'

type CurrencyContextType = {
  currency: Currency
  setCurrency: (c: Currency) => void
  convert: (price: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | null>(null)

const rates: Record<Currency, number> = {
  EUR: 1,
  USD: 1.09,
  ARS: 900,
}

const symbols: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
  ARS: '$',
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('EUR')

  useEffect(() => {
    const saved = localStorage.getItem('currency')
    if (saved) setCurrency(saved as Currency)
  }, [])

  useEffect(() => {
    localStorage.setItem('currency', currency)
  }, [currency])

  const convert = (price: number) => {
    const converted = price * rates[currency]
    return `${symbols[currency]}${converted.toFixed(2)}`
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used inside provider')
  return ctx
}