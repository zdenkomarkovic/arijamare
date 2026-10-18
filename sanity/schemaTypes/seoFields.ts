import { defineField } from 'sanity'

export const seoFields = [
  defineField({
    name: 'seoTitle',
    title: 'SEO naslov',
    type: 'string',
    group: 'seo',
    description: 'Naslov u Google pretrazi (title tag). Ako je prazno, koristi se naziv.',
  }),
  defineField({
    name: 'seoDescription',
    title: 'SEO opis',
    type: 'text',
    rows: 3,
    group: 'seo',
    description: 'Opis u Google pretrazi (meta description).',
  }),
]

export const seoGroups = [{ name: 'seo', title: 'SEO' }]
