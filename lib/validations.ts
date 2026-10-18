import { z } from "zod";

// ─── Zajednicki Zod Schemas ───────────────────────────────────────────────────
// Koristi ove schema-e kao gradivne blokove za forme i API validaciju

export const emailSchema = z
  .string()
  .email("Unesite ispravnu email adresu")
  .min(1, "Email je obavezan");

export const phoneSchema = z
  .string()
  .regex(/^[+]?[\d\s\-().]{7,15}$/, "Unesite ispravan broj telefona")
  .optional();

export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Neispravan slug format");

export const urlSchema = z.string().url("Unesite ispravnu URL adresu").optional();

// ─── Kontakt Forma ────────────────────────────────────────────────────────────
// Prilagodi po potrebi za konkretan sajt

export const contactFormSchema = z.object({
  name: z.string().min(2, "Ime mora imati najmanje 2 karaktera").max(100),
  email: emailSchema,
  message: z.string().min(10, "Poruka mora imati najmanje 10 karaktera").max(2000),
  phone: phoneSchema,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ─── Pagination ───────────────────────────────────────────────────────────────

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(10),
});

export type PaginationParams = z.infer<typeof paginationSchema>;
