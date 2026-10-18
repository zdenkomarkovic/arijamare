import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Spaja CSS klase zajedno i ispravno resava konflikte Tailwind klasa.
 * Koristi se umesto manuelnog string concatenation.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-blue-500", variant === "big" && "text-xl")
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formatira datum na srpski lokalizovani string.
 *
 * @example
 * formatDate(new Date()) // "13. februar 2026."
 * formatDate("2026-01-01", { locale: "en-US" }) // "January 1, 2026"
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions & { locale?: string } = {}
): string {
  const { locale = "sr-RS", ...dateOptions } = options;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...dateOptions,
  }).format(new Date(date));
}

/**
 * Skracuje tekst na zadati broj karaktera.
 *
 * @example
 * truncate("Dugi naslov clanka", 10) // "Dugi naslo..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

/**
 * Pretvara tekst u URL-friendly slug.
 *
 * @example
 * slugify("Zdravo Svete!") // "zdravo-svete"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // ukloni dijakritike
    .replace(/[čćžšđ]/g, (char) => {
      const map: Record<string, string> = {
        č: "c", ć: "c", ž: "z", š: "s", đ: "dj",
      };
      return map[char] ?? char;
    })
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Delay - korisno za debounce, animacije, testove.
 *
 * @example
 * await sleep(500); // cekaj 500ms
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Bezbedno parsuje JSON, vraca null ako parsovanje ne uspe.
 */
export function safeJsonParse<T>(json: string): T | null {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

/**
 * Vraca inicijale iz punog imena.
 *
 * @example
 * getInitials("Petar Petrovic") // "PP"
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}
