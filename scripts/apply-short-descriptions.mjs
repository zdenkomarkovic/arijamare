// Upisuje kratke opise proizvoda (prikazuju se na kartici) u Sanity.
// Ne prepisuje opise koji su već uneti ručno u Studiju.
// Pokretanje: node --env-file=.env.local scripts/apply-short-descriptions.mjs
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'

const texts = JSON.parse(readFileSync(new URL('./short-descriptions.json', import.meta.url), 'utf8'))
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const products = await client.fetch('*[_type == "product"]{ _id, name, shortDescription }')
const ids = new Set(products.map((p) => p._id))
const missing = products.filter((p) => !texts[p._id])
const unknown = Object.keys(texts).filter((id) => !ids.has(id))
const tooLong = Object.entries(texts).filter(([, t]) => t.length > 160)

const tx = client.transaction()
let n = 0
for (const p of products) {
  if (texts[p._id] && !p.shortDescription) {
    tx.patch(p._id, { set: { shortDescription: texts[p._id] } })
    n++
  }
}
await tx.commit()
console.log(`Upisano: ${n} / ${products.length}`)
if (missing.length) console.log('Bez teksta:', missing.map((p) => `${p._id} ${p.name}`))
if (unknown.length) console.log('Nepoznati ID-evi u JSON-u:', unknown)
if (tooLong.length) console.log('Duže od 160 znakova:', tooLong.map(([id, t]) => `${id} (${t.length})`))
