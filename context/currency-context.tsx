// context/currency-context.tsx

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// ✅ Base currency PKR hai (prices PKR mein hain).
// Conversion rates approximate hain — aap baad mein update kar sakte hain.
const CONVERSION_RATES: Record<string, number> = {
  USD: 0.0036,    // 1 PKR = 0.0036 USD
  CAD: 0.0049,    // 1 PKR = 0.0049 CAD
  EUR: 0.0033,    // 1 PKR = 0.0033 EUR
  AUD: 0.0054,    // 1 PKR = 0.0054 AUD
  GBP: 0.0028,    // 1 PKR = 0.0028 GBP
  AED: 0.013,     // 1 PKR = 0.013 AED
};

// ✅ Currency Symbols
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  CAD: "C$",
  EUR: "€",
  AUD: "A$",
  GBP: "£",
  AED: "AED",
};

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  formatPrice: (priceInPKR: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // ✅ Default currency USD set kar di
  const [currency, setCurrency] = useState("USD");

  const formatPrice = (priceInPKR: number) => {
    const rate = CONVERSION_RATES[currency] || 1;
    const converted = priceInPKR * rate;
    const symbol = CURRENCY_SYMBOLS[currency] || "$";
    
    return `${symbol} ${converted.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}
