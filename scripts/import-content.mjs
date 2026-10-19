// Uvoz SEO podataka, blog članaka i statičnih stranica sa arijamare.com u Sanity.
// Pokretanje: node --env-file=.env.local scripts/import-content.mjs [--dry]
import { createClient } from '@sanity/client'
import { htmlToBlocks, plainText } from './lib/html-to-pt.mjs'

const WP = 'https://www.arijamare.com/wp-json/wp/v2'
const DRY = process.argv.includes('--dry')
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const SITE_SUFFIX = /\s*\|\s*Arijamare - eterična ulja\s*$/i
const cleanTitle = (t) => (t ?? '').replace(SITE_SUFFIX, '').trim()
const seo = (y) => ({
  ...(y?.title ? { seoTitle: cleanTitle(y.title) } : {}),
  ...(y?.description ? { seoDescription: y.description } : {}),
})

const imgCache = new Map()
async function uploadImage(url) {
  if (imgCache.has(url)) return imgCache.get(url)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const id = DRY ? 'dry' : (await client.assets.upload('image', buf, { filename: url.split('/').pop() }))._id
  imgCache.set(url, id)
  return id
}

async function all(path) {
  const out = []
  for (let page = 1; ; page++) {
    const res = await fetch(`${WP}${path}${path.includes('?') ? '&' : '?'}per_page=100&page=${page}`)
    if (!res.ok) break
    const data = await res.json()
    out.push(...data)
    if (data.length < 100) break
  }
  return out
}

const put = async (doc) => {
  if (!DRY) await client.createOrReplace(doc)
}

// ---------- SEO za proizvode i kategorije ----------
const prodSeo = await all('/product?_fields=id,yoast_head_json')
for (const p of prodSeo) {
  if (!DRY) await client.patch(`product-${p.id}`).set(seo(p.yoast_head_json)).commit().catch(() => {})
}
console.log('SEO proizvodi:', prodSeo.length)

const catSeo = await all('/product_cat?_fields=id,slug,yoast_head_json')
for (const c of catSeo) {
  if (c.slug === 'hladno-cedjena-ulja-2') continue
  if (!DRY) await client.patch(`category-${c.id}`).set(seo(c.yoast_head_json)).commit().catch(() => {})
}
console.log('SEO kategorije:', catSeo.length)

// ---------- Statične stranice ----------
const SKIP_PAGES = new Set(['evercompare', 'hvala', 'my-account', 'checkout', 'cart', 'home', 'homepage-1'])
const pages = await all('/pages?_fields=id,slug,link,title,content,yoast_head_json')
for (const p of pages) {
  const isHome = new URL(p.link).pathname === '/'
  if (!isHome && SKIP_PAGES.has(p.slug)) continue
  let body = []
  const seoOnly = isHome || p.slug === 'blog' || p.slug === 'prodavnica'
  if (!seoOnly) {
    body = await htmlToBlocks(p.content.rendered, { uploadImage })
    // naslov h1 stranice se renderuje posebno
    if (body[0]?.style === 'h2' && plainText(p.title.rendered) === body[0].children.map((c) => c.text).join('')) body.shift()
  }
  await put({
    _id: `page-${isHome ? 'home' : p.slug}`,
    _type: 'sitePage',
    title: plainText(p.title.rendered),
    slug: { _type: 'slug', current: isHome ? 'home' : p.slug },
    body,
    ...seo(p.yoast_head_json),
  })
  console.log('stranica:', p.slug || 'home', `(${body.length} blokova)`)
}

// ---------- Blog ----------
const wpCats = Object.fromEntries((await all('/categories?_fields=id,name,slug')).map((c) => [c.id, { name: c.name, slug: c.slug }]))
const posts = await all('/posts?_fields=id,slug,date,modified,title,excerpt,content,categories,featured_media,yoast_head_json')
// Naslovne slike: featured_media je samo ID, pa se URL-ovi uzimaju iz /media
const mediaIds = [...new Set(posts.map((p) => p.featured_media).filter(Boolean))]
const mediaById = {}
for (let i = 0; i < mediaIds.length; i += 50) {
  const chunk = mediaIds.slice(i, i + 50)
  for (const m of await all(`/media?include=${chunk.join(',')}&_fields=id,source_url,alt_text`)) mediaById[m.id] = m
}
for (const p of posts) {
  const media = mediaById[p.featured_media]
  const body = await htmlToBlocks(p.content.rendered, { uploadImage })
  const mainImage = media?.source_url
    ? { _type: 'image', asset: { _type: 'reference', _ref: await uploadImage(media.source_url) }, alt: media.alt_text || plainText(p.title.rendered) }
    : undefined
  await put({
    _id: `post-${p.id}`,
    _type: 'post',
    title: plainText(p.title.rendered),
    slug: { _type: 'slug', current: p.slug },
    publishedAt: new Date(p.date_gmt ? p.date_gmt + 'Z' : p.date).toISOString(),
    modifiedAt: new Date(p.modified_gmt ? p.modified_gmt + 'Z' : p.modified).toISOString(),
    excerpt: plainText(p.excerpt.rendered),
    categories: p.categories.map((id) => wpCats[id]).filter(Boolean).map((c, i) => ({ _type: 'blogCategory', _key: `c${i}`, ...c })),
    ...(mainImage ? { mainImage } : {}),
    body,
    ...seo(p.yoast_head_json),
  })
  console.log(`članak: ${p.slug} (${body.length} blokova)`)
}
console.log(DRY ? 'DRY RUN gotov' : 'Uvoz sadržaja gotov')
