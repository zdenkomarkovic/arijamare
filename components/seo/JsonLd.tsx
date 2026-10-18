/**
 * Komponenta za dodavanje JSON-LD structured data.
 * Poboljsava SEO i omogucava rich results u Google pretrage.
 *
 * @example
 * // U page.tsx:
 * <JsonLd
 *   data={{
 *     "@context": "https://schema.org",
 *     "@type": "Organization",
 *     name: "Moja Firma",
 *     url: "https://mojafirma.rs",
 *   }}
 * />
 *
 * // Za blog post:
 * <JsonLd
 *   data={{
 *     "@context": "https://schema.org",
 *     "@type": "Article",
 *     headline: post.title,
 *     datePublished: post.date,
 *   }}
 * />
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
