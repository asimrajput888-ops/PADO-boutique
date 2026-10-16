// context/currency-context.tsx

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "USD" | "CAD" | "EUR" | "AUD" | "GBP" | "AED";

// Static exchange rates (fallback — no API call needed)
// Update these manually if rates change significantly
const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  CAD: 1.36,
  EUR: 0.92,
  AUD: 1.52,
  GBP: 0.79,
  AED: 3.67,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  CAD: "C$",
  EUR: "€",
  AUD: "A$",
  GBP: "£",
  AED: "AED ",
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (usdPrice: number) => string;
  convertPrice: (usdPrice: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  // Load saved currency from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pado_currency") as Currency | null;
      if (saved && EXCHANGE_RATES[saved]) {
        setCurrencyState(saved);
      }
    } catch (err) {
      console.error("Currency load error:", err);
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    try {
      localStorage.setItem("pado_currency", newCurrency);
    } catch (err) {
      console.error("Currency save error:", err);
    }
  };

  const convertPrice = (usdPrice: number): number => {
    const rate = EXCHANGE_RATES[currency] || 1;
    return usdPrice * rate;
  };

  const formatPrice = (usdPrice: number): string => {
    if (typeof usdPrice !== "number" || isNaN(usdPrice)) {
      return "$0";
    }

    const converted = convertPrice(usdPrice);
    const symbol = CURRENCY_SYMBOLS[currency] || "$";

    // Format based on currency
    if (currency === "AED") {
      return `${symbol}${converted.toFixed(0)}`;
    }

    return `${symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, formatPrice, convertPrice }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
