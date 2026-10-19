// Uvoz opisa (sa bold/linkovima), kratkog opisa ispod cene i recenzija proizvoda sa arijamare.com.
// Piše samo ova polja (patch), pa ostala polja proizvoda (kategorija, SEO, kratak opis za karticu...) ostaju.
// Pokretanje: node --env-file=.env.local scripts/import-product-texts.mjs [--dry]
import { createClient } from '@sanity/client'
import { htmlToBlocks, plainText } from './lib/html-to-pt.mjs'

const BASE = 'https://www.arijamare.com/wp-json/wc/store/v1'
const DRY = process.argv.includes('--dry')
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const getJson = async (path) => {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`${path}: ${res.status}`)
  return res.json()
}

const products = await getJson('/products?per_page=100')
const reviewsRaw = await getJson('/products/reviews?per_page=100')

const reviewsByProduct = {}
for (const r of reviewsRaw) {
  ;(reviewsByProduct[r.product_id] ??= []).push({
    _type: 'review',
    _key: `r${r.id}`,
    author: plainText(r.reviewer) || 'Kupac',
    rating: Number(r.rating) || 5,
    date: new Date(r.date_created_gmt ? r.date_created_gmt + 'Z' : r.date_created).toISOString(),
    text: plainText(r.review),
  })
}

let n = 0
for (const p of products) {
  const description = await htmlToBlocks(p.description)
  const summary = await htmlToBlocks(p.short_description)
  const reviews = reviewsByProduct[p.id] ?? []
  if (!DRY) {
    await client
      .patch(`product-${p.id}`)
      .set({ description, summary, reviews })
      .commit()
      .catch((e) => console.warn(`  preskočeno product-${p.id}: ${e.message}`))
  }
  n++
  console.log(`[${n}/${products.length}] ${p.name} — opis ${description.length}, kratki ${summary.length}, recenzije ${reviews.length}`)
}
console.log(DRY ? 'DRY RUN gotov' : 'Uvoz tekstova gotov')
