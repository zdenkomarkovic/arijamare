// Pravi podkategorije eteričnih ulja (po nameni) i razvrstava proizvode.
// Podkategorije se posle toga mogu menjati u Sanity Studiju.
// Pokretanje: node --env-file=.env.local scripts/create-subcategories.mjs
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const PARENT = 'category-56' // Eterična ulja

const SUBS = [
  {
    slug: 'za-opustanje-i-san',
    name: 'Za opuštanje i san',
    description: 'Eterična ulja smirujuće arome za opuštanje, odmor od stresa i miran san.',
    products: [1218, 4641, 4633, 4629, 5896, 4686, 4625],
  },
  {
    slug: 'za-disanje-i-imunitet',
    name: 'Za disanje i imunitet',
    description: 'Eterična ulja za inhalaciju, difuzer i sezonu prehlada, kao podrška imunitetu.',
    products: [4010, 6796, 1229, 1226, 1830, 4631, 5223, 4020, 4646, 1224, 5204, 3967],
  },
  {
    slug: 'za-negu-koze',
    name: 'Za negu kože',
    description: 'Eterična ulja koja se koriste u nezi kože lica i tela, uvek razblažena u baznom ulju.',
    products: [1211, 4639, 1220, 4013, 1414, 5900, 1655],
  },
  {
    slug: 'za-energiju-i-fokus',
    name: 'Za energiju i fokus',
    description: 'Osvežavajuća i podsticajna eterična ulja za koncentraciju, energiju i bolje raspoloženje.',
    products: [1222, 5220, 4015, 5194, 5246, 4648, 1215, 4627, 4636],
  },
  {
    slug: 'za-balans-organizma',
    name: 'Za balans organizma',
    description: 'Eterična ulja tradicionalno cenjena kao podrška ženskom zdravlju i varenju.',
    products: [4018, 4644, 1411],
  },
]

const tx = client.transaction()
for (const [i, s] of SUBS.entries()) {
  tx.createOrReplace({
    _id: `category-sub-${s.slug}`,
    _type: 'category',
    name: s.name,
    slug: { _type: 'slug', current: s.slug },
    description: s.description,
    order: i + 1,
    parent: { _type: 'reference', _ref: PARENT },
  })
  for (const id of s.products) {
    tx.patch(`product-${id}`, { set: { category: { _type: 'reference', _ref: `category-sub-${s.slug}` } } })
  }
}
await tx.commit()

const all = SUBS.flatMap((s) => s.products)
const dup = all.filter((id, i) => all.indexOf(id) !== i)
console.log('Podkategorije:', SUBS.length, '| razvrstanih proizvoda:', all.length, dup.length ? `| DUPLIRANI: ${dup}` : '')
const left = await client.fetch('*[_type=="product" && category._ref == $p]{name}', { p: PARENT })
console.log('Ostalo direktno u "Eterična ulja":', left.map((x) => x.name))
