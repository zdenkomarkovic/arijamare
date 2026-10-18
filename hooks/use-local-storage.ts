"use client";

import { useCallback, useEffect, useState } from "react";
import { safeJsonParse } from "@/lib/utils";

/**
 * Hook za rad sa localStorage sa TypeScript podrskom.
 * Automatski se sinhronizuje izmedju tabova.
 *
 * @example
 * const [theme, setTheme, removeTheme] = useLocalStorage("theme", "light");
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    const item = window.localStorage.getItem(key);
    if (item === null) return initialValue;
    return safeJsonParse<T>(item) ?? initialValue;
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const newValue = value instanceof Function ? value(prev) : value;
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(newValue));
        }
        return newValue;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
    setStoredValue(initialValue);
  }, [key, initialValue]);

  // Sinhronizacija izmedju tabova
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        setStoredValue(safeJsonParse<T>(e.newValue) ?? initialValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
