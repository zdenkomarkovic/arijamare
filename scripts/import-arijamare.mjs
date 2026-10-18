// Uvoz kategorija i proizvoda sa arijamare.com (WooCommerce Store API) u Sanity.
// Pokretanje: node --env-file=.env.local scripts/import-arijamare.mjs [--dry]
import { createClient } from '@sanity/client'

const BASE = 'https://www.arijamare.com/wp-json/wc/store/v1'
const DRY = process.argv.includes('--dry')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const entities = { '&amp;': '&', '&nbsp;': ' ', '&quot;': '"', '&#8211;': '–', '&#8217;': '’', '&#8220;': '“', '&#8221;': '”', '&lt;': '<', '&gt;': '>', '&#039;': "'" }
const decode = (s) => s.replace(/&#?\w+;/g, (m) => entities[m] ?? m)

let keyN = 0
const key = () => `k${(keyN++).toString(36)}`

function block(text, style = 'normal') {
  return { _type: 'block', _key: key(), style, markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }] }
}

// HTML -> Portable Text (paragrafi, naslovi, liste kao stavke)
function htmlToBlocks(html) {
  if (!html) return []
  const clean = html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
  const out = []
  const re = /<(h[1-6]|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi
  let m
  while ((m = re.exec(clean))) {
    const tag = m[1].toLowerCase()
    const text = decode(m[2].replace(/<[^>]+>/g, '')).replace(/[ \t]+/g, ' ').trim()
    if (!text) continue
    if (tag === 'li') out.push(block(`• ${text}`))
    else if (tag === 'p') out.push(block(text))
    else out.push(block(text, tag === 'h1' || tag === 'h2' ? 'h3' : tag))
  }
  if (!out.length) {
    const text = decode(clean.replace(/<[^>]+>/g, '')).trim()
    if (text) out.push(block(text))
  }
  return out
}

const imageCache = new Map()
async function uploadImage(url) {
  if (imageCache.has(url)) return imageCache.get(url)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Slika ${url}: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const asset = DRY ? { _id: 'dry' } : await client.assets.upload('image', buf, { filename: url.split('/').pop() })
  imageCache.set(url, asset._id)
  return asset._id
}

const imageField = async (src, alt) => ({
  _type: 'image',
  asset: { _type: 'reference', _ref: await uploadImage(src) },
  ...(alt ? { alt } : {}),
})

const getJson = async (path) => {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`${path}: ${res.status}`)
  return res.json()
}

// --- Kategorije ---
const cats = await getJson('/products/categories?per_page=100')
// "hladno-cedjena-ulja-2" je duplikat; spajamo ga u "hladno-cedjena-ulja"
const canonical = (c) => (c.slug === 'hladno-cedjena-ulja-2' ? cats.find((x) => x.slug === 'hladno-cedjena-ulja') : c)
const catId = (c) => `category-${canonical(c).id}`

for (const c of cats) {
  if (canonical(c).id !== c.id) continue
  const doc = {
    _id: catId(c),
    _type: 'category',
    name: decode(c.name),
    slug: { _type: 'slug', current: c.slug },
    ...(c.description ? { description: decode(c.description.replace(/<[^>]+>/g, '')).trim() } : {}),
    ...(c.parent ? { parent: { _type: 'reference', _ref: `category-${c.parent}` } } : {}),
    ...(c.image?.src ? { image: await imageField(c.image.src, c.image.alt || decode(c.name)) } : {}),
  }
  if (!DRY) await client.createOrReplace(doc)
  console.log('kategorija:', doc.name)
}

// --- Proizvodi ---
const products = await getJson('/products?per_page=100')
let n = 0
for (const p of products) {
  const regular = Number(p.prices.regular_price) || undefined
  const sale = Number(p.prices.sale_price) || undefined
  const onSale = p.on_sale && sale && regular && sale < regular
  const cat = p.categories[0] && cats.find((c) => c.id === p.categories[0].id)
  const desc = [...htmlToBlocks(p.short_description), ...htmlToBlocks(p.description)]
  const doc = {
    _id: `product-${p.id}`,
    _type: 'product',
    name: decode(p.name),
    slug: { _type: 'slug', current: p.slug },
    ...(cat ? { category: { _type: 'reference', _ref: catId(cat) } } : {}),
    price: onSale ? regular : Number(p.prices.price) || regular,
    ...(onSale ? { salePrice: sale } : {}),
    images: await Promise.all(p.images.map((i) => imageField(i.src, i.alt || decode(p.name)))),
    description: desc,
    inStock: p.is_in_stock,
    featured: false,
  }
  if (!DRY) await client.createOrReplace(doc)
  console.log(`[${++n}/${products.length}]`, doc.name, doc.price, doc.salePrice ?? '')
}
console.log(DRY ? 'DRY RUN gotov' : 'Uvoz gotov')
