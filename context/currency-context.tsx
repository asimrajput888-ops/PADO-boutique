// context/currency-context.tsx

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  formatPrice: (priceInUSD: number) => string;
  loadingRates: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState("USD");
  const [rates, setRates] = useState<Record<string, number>>({ USD: 1 });
  const [loadingRates, setLoadingRates] = useState(true);

  // ✅ Step 1: Customer ki location detect karke currency set karein
  useEffect(() => {
    const detectUserCurrency = () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let detectedCurrency = "USD"; // Default

        if (timezone.includes("Asia/Dubai") || timezone.includes("Asia/Muscat")) {
          detectedCurrency = "AED";
        } else if (timezone.includes("Europe/London")) {
          detectedCurrency = "GBP";
        } else if (timezone.includes("Europe")) {
          detectedCurrency = "EUR";
        } else if (timezone.includes("Australia")) {
          detectedCurrency = "AUD";
        } else if (timezone.includes("America/Toronto") || timezone.includes("America/Vancouver")) {
          detectedCurrency = "CAD";
        } else if (timezone.includes("America")) {
          detectedCurrency = "USD";
        }

        setCurrency(detectedCurrency);
      } catch (error) {
        console.error("Currency detection failed:", error);
        setCurrency("USD");
      }
    };

    detectUserCurrency();
  }, []);

  // ✅ Step 2: Live exchange rates fetch karein (Frankfurter API - Free, No Key)
  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Frankfurter API - Free, No API Key, 170+ currencies
        const response = await fetch("https://api.frankfurter.app/latest?from=USD");
        if (!response.ok) throw new Error("Failed to fetch rates");
        
        const data = await response.json();
        // ✅ Rates ko base USD ke hisaab se set karein
        setRates({
          USD: 1,
          ...data.rates,
        });
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
        // Fallback: Approximate rates (agar API fail ho jaye)
        setRates({
          USD: 1,
          CAD: 1.36,
          EUR: 0.92,
          AUD: 1.52,
          GBP: 0.79,
          AED: 3.67,
        });
      } finally {
        setLoadingRates(false);
      }
    };

    fetchRates();
    // Har 6 ghante baad rates refresh karein
    const interval = setInterval(fetchRates, 6 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (priceInUSD: number) => {
    const rate = rates[currency] || 1;
    const converted = priceInUSD * rate;
    const symbol = CURRENCY_SYMBOLS[currency] || "$";

    return `${symbol} ${converted.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, loadingRates }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}
