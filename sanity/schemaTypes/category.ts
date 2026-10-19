import { defineField, defineType } from 'sanity'
import { seoFields, seoGroups } from './seoFields'

export const categoryType = defineType({
  name: 'category',
  title: 'Kategorija',
  type: 'document',
  groups: seoGroups,
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
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'parent',
      title: 'Nadkategorija',
      type: 'reference',
      to: [{ type: 'category' }],
      options: { disableNew: true },
    }),
    defineField({
      name: 'order',
      title: 'Redosled u meniju',
      type: 'number',
      description: 'Manji broj se prikazuje ranije. Kategorije bez broja idu na kraj, po abecedi.',
    }),
    defineField({
      name: 'image',
      title: 'Slika',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt tekst', type: 'string' }),
      ],
    }),
    ...seoFields,
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
})
