# Next.js Starter

Starter template za brz početak novih Next.js projekata. **Bez nametnutog dizajna** – svaki sajt izgleda onako kako ti odlučiš.

## Brzi start

```bash
# 1. Kopiraj starter u novi projekat
cp -r E:/Sajtovi/starter E:/Sajtovi/novi-sajt

# 2. Uđi u folder
cd E:/Sajtovi/novi-sajt

# 3. Instaliraj zavisnosti
npm install

# 4. Kopiraj i popuni env varijable
cp .env.example .env.local

# 5. Pokreni dev server
npm run dev
```

---

## Šta je uključeno

### Struktura projekta

```
src/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Root layout (dodaj fontove, providere ovde)
│   ├── page.tsx             # Početna stranica
│   ├── not-found.tsx        # 404 stranica
│   ├── error.tsx            # Error boundary
│   ├── loading.tsx          # Loading state
│   ├── robots.ts            # robots.txt (auto-generisan)
│   ├── sitemap.ts           # sitemap.xml (auto-generisan)
│   └── api/
│       └── health/route.ts  # Health check: GET /api/health
├── components/
│   └── seo/
│       └── JsonLd.tsx       # JSON-LD structured data
├── hooks/
│   ├── use-debounce.ts      # Debounce hook
│   ├── use-local-storage.ts # LocalStorage hook
│   └── use-media-query.ts   # Media query hook
├── lib/
│   ├── constants.ts         # SITE_URL, SITE_NAME
│   ├── env.ts               # Validacija env varijabli (Zod)
│   ├── metadata.ts          # Helper za Next.js Metadata
│   ├── utils.ts             # cn, formatDate, slugify, truncate...
│   └── validations.ts       # Zod schemas (email, kontakt forma...)
└── types/
    └── index.ts             # Zajednički TypeScript tipovi
```

---

## Šta da uradiš za svaki novi sajt

### 1. Preimenuj projekat
U `package.json` promeni `"name": "starter"` u ime projekta.

### 2. Popuni `.env.local`
```env
NEXT_PUBLIC_SITE_URL=https://tvojsajt.rs
NEXT_PUBLIC_SITE_NAME=Naziv Sajta
```

### 3. Dodaj fontove u `layout.tsx`
```tsx
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

// U html tag:
<html lang="sr" className={`${inter.variable} ${playfair.variable}`}>
```

### 4. Definiši CSS varijable u `globals.css`
```css
:root {
  --color-primary: #your-color;
  --font-sans: var(--font-inter);
}
```

### 5. Ažuriraj `sitemap.ts`
Dodaj sve stranice sajta i dinamički generisane URL-ove.

### 6. Dodaj OG sliku
Stavi `og-image.png` (1200×630px) u `/public` folder.

### 7. Ažuriraj metadata u `layout.tsx`
Promeni `description` i ostale vrednosti.

---

## Dodavanje CSS frameworka (opciono)

Starter namerno ne uključuje CSS framework. Dodaj šta god preferiš:

### Tailwind CSS
```bash
npm install tailwindcss @tailwindcss/postcss postcss
```
Kreirati `postcss.config.mjs` i dodati `@import "tailwindcss"` u `globals.css`.

### CSS Modules
Već podržano u Next.js – samo kreiraj `Component.module.css` fajlove.

### Styled Components / Emotion
```bash
npm install styled-components
# ili
npm install @emotion/react @emotion/styled
```

---

## Dostupni skripti

| Komanda | Opis |
|---------|------|
| `npm run dev` | Pokretanje dev servera (Turbopack) |
| `npm run build` | Build za produkciju |
| `npm run start` | Pokretanje produkcijskog servera |
| `npm run lint` | ESLint provjera |
| `npm run format` | Prettier formatiranje |
| `npm run typecheck` | TypeScript provjera |

---

## Korisni importi

```tsx
// Utility funkcije
import { cn, formatDate, slugify, truncate } from "@/lib/utils";

// SEO metadata
import { buildMetadata } from "@/lib/metadata";

// Konstante
import { SITE_URL, SITE_NAME } from "@/lib/constants";

// Hooks
import { useDebounce } from "@/hooks/use-debounce";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useMediaQuery } from "@/hooks/use-media-query";

// Tipovi
import type { ApiResponse, PageParams, Size, Variant } from "@/types";

// JSON-LD
import { JsonLd } from "@/components/seo/JsonLd";
```
