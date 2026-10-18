import { defineField, defineType } from 'sanity'

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[šŠ]/g, 's')
    .replace(/[čČ]/g, 'c')
    .replace(/[ćĆ]/g, 'c')
    .replace(/[žŽ]/g, 'z')
    .replace(/[đĐ]/g, 'dj')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/-+/g, '-')
}

export const productType = defineType({
  name: 'product',
  title: 'Proizvod',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: async (input, _schemaType, context) => {
          const baseSlug = slugify(input)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const doc = context.parent as any
          const docId = (doc?._id ?? '').replace('drafts.', '')

          const client = context.getClient({ apiVersion: '2024-01-01' })
          const existing = await client.fetch<number>(
            `count(*[_type == "product" && slug.current == $slug && _id != $id && _id != $draftId])`,
            { slug: baseSlug, id: docId, draftId: `drafts.${docId}` },
          )

          if (existing === 0) return baseSlug
          // Append short suffix from document ID to guarantee uniqueness
          return `${baseSlug}-${docId.slice(-6)}`
        },
        isUnique: async (slug, context) => {
          const client = context.getClient({ apiVersion: '2024-01-01' })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const docId = ((context as any).document?._id ?? '').replace('drafts.', '')
          const count = await client.fetch<number>(
            `count(*[_type == "product" && slug.current == $slug && _id != $id && _id != $draftId])`,
            { slug, id: docId, draftId: `drafts.${docId}` },
          )
          return count === 0
        },
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorija',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'price',
      title: 'Cena (RSD)',
      type: 'number',
      validation: (r) => r.positive(),
    }),
    defineField({
      name: 'salePrice',
      title: 'Akcijska cena (RSD)',
      type: 'number',
      validation: (r) => r.positive(),
    }),
    defineField({
      name: 'images',
      title: 'Slike',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt tekst', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'inStock',
      title: 'Na stanju',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Istaknuti proizvod',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'price', media: 'images.0' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({ title, subtitle, media }: any) {
      return { title, subtitle: subtitle ? `${subtitle} RSD` : '', media }
    },
  },
})
