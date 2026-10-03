// context/currency-context.tsx

"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Currency = "USD" | "PKR" | "AED" | "GBP" | "EUR" | "CAD" | "AUD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amount: number) => string;
  rates: Record<string, number>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Fallback rates (agar API fail ho jaye)
const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  PKR: 278,
  AED: 3.67,
  GBP: 0.79,
  EUR: 0.92,
  CAD: 1.36,
  AUD: 1.52,
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);

  useEffect(() => {
    // Check localStorage cache first (valid for 24 hours)
    const cached = typeof window !== "undefined" ? localStorage.getItem("pado-rates") : null;
    const cachedTime = typeof window !== "undefined" ? localStorage.getItem("pado-rates-time") : null;

    if (cached && cachedTime) {
      const hoursSince = (Date.now() - Number(cachedTime)) / (1000 * 60 * 60);
      if (hoursSince < 24) {
        try {
          setRates(JSON.parse(cached));
          return;
        } catch {
          // Invalid cache, continue to fetch
        }
      }
    }

    const fetchRates = async () => {
      try {
        const response = await fetch(
          "https://api.frankfurter.app/latest?from=USD"
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (data?.rates) {
          const newRates = { USD: 1, ...data.rates };
          setRates(newRates);

          // Cache for 24 hours
          if (typeof window !== "undefined") {
            localStorage.setItem("pado-rates", JSON.stringify(newRates));
            localStorage.setItem("pado-rates-time", String(Date.now()));
          }
        }
      } catch {
        // Silent fail — fallback rates already set
        // CORS errors are common, fallback handles them
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
      CAD: "C$",
      AUD: "A$",
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
