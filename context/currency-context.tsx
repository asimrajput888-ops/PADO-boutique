// context/currency-context.tsx

"use client";

import { useState, useEffect } from "react";

type Currency = "USD" | "CAD" | "EUR" | "AUD" | "GBP" | "AED";

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1, CAD: 1.36, EUR: 0.92, AUD: 1.52, GBP: 0.79, AED: 3.67,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$", CAD: "C$", EUR: "€", AUD: "A$", GBP: "£", AED: "AED ",
};

let globalCurrency: Currency = "USD";
const listeners = new Set<(c: Currency) => void>();

export function useCurrency() {
  const [currency, setCurrencyState] = useState<Currency>(globalCurrency);

  useEffect(() => {
    const listener = (c: Currency) => setCurrencyState(c);
    listeners.add(listener);
    try {
      const saved = localStorage.getItem("pado_currency") as Currency | null;
      if (saved && EXCHANGE_RATES[saved]) {
        globalCurrency = saved;
        setCurrencyState(saved);
      }
    } catch {}
    return () => { listeners.delete(listener); };
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    globalCurrency = newCurrency;
    listeners.forEach((l) => l(newCurrency));
    try { localStorage.setItem("pado_currency", newCurrency); } catch {}
  };

  const convertPrice = (usdPrice: number): number => {
    return usdPrice * (EXCHANGE_RATES[currency] || 1);
  };

  const formatPrice = (usdPrice: number): string => {
    if (typeof usdPrice !== "number" || isNaN(usdPrice)) return "$0";
    const converted = convertPrice(usdPrice);
    const symbol = CURRENCY_SYMBOLS[currency] || "$";
    return currency === "AED" ? `${symbol}${converted.toFixed(0)}` : `${symbol}${converted.toFixed(2)}`;
  };

  return { currency, setCurrency, formatPrice, convertPrice };
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
