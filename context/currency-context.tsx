'use client'

import React, { createContext, useContext, useState } from 'react'

export type Currency = 'USD' | 'CAD' | 'EUR' | 'GBP'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (amountInUSD: number) => string
}

const RATES: Record<Currency, { rate: number; symbol: string }> = {
  USD: { rate: 1, symbol: '$' },
  CAD: { rate: 1.35, symbol: 'CA$' },
  EUR: { rate: 0.92, symbol: '€' },
  GBP: { rate: 0.79, symbol: '£' },
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD')

  const formatPrice = (amountInUSD: number) => {
    const { rate, symbol } = RATES[currency]
    const converted = (amountInUSD * rate).toFixed(0)
    return `${symbol}${converted} ${currency}`
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
