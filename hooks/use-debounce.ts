"use client";

import { useEffect, useState } from "react";

/**
 * Odlaze azuriranje vrednosti za zadati broj milisekundi.
 * Korisno za search input-e, filtriranje, autocomplete.
 *
 * @example
 * const [query, setQuery] = useState("");
 * const debouncedQuery = useDebounce(query, 300);
 *
 * useEffect(() => {
 *   // Ovo se poziva samo 300ms nakon sto korisnik prestane da kuca
 *   fetchResults(debouncedQuery);
 * }, [debouncedQuery]);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
