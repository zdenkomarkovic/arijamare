// Zajednicki TypeScript tipovi koji se koriste u celom projektu

// ─── Utility Types ───────────────────────────────────────────────────────────

/** Pravi sve properties opcionalnim, rekurzivno */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** Pravi odredjene properties obaveznim */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Uklanja null i undefined iz tipa */
export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

// ─── API Types ────────────────────────────────────────────────────────────────

/** Standardni API odgovor */
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

/** API odgovor sa paginacijom */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

/** API greska */
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// ─── Next.js Helpers ─────────────────────────────────────────────────────────

/** Params za dinamicke rute */
export type PageParams<T extends Record<string, string> = Record<string, string>> = {
  params: Promise<T>;
  searchParams: Promise<Record<string, string | string[]>>;
};

// ─── UI Types ────────────────────────────────────────────────────────────────

/** Velicine koje se cesto koriste */
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

/** Varijante koje se cesto koriste */
export type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
