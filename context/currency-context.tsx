// context/currency-context.tsx

"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Currency = "USD" | "PKR" | "AED" | "GBP" | "EUR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amount: number) => string;
  rates: Record<string, number>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  PKR: 278,
  AED: 3.67,
  GBP: 0.79,
  EUR: 0.92,
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("https://api.frankfurter.app/latest?from=USD");
        if (!response.ok) return;
        const data = await response.json();
        if (data?.rates) {
          setRates({ USD: 1, ...data.rates });
        }
      } catch {
        // Silent fail — fallback rates already set
      }
    };
    fetchRates();
  }, []);

  const formatPrice = (amount: number) => {
    const rate = rates[currency] || 1;
    const converted = amount * rate;
    const symbols: Record<Currency, string> = {
      USD: "$",
      PKR: "Rs. ",
      AED: "AED ",
      GBP: "£",
      EUR: "€",
    };
    return `${symbols[currency]}${converted.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}
