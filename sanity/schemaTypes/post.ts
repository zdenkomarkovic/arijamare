import { defineField, defineType } from 'sanity'
import { seoFields, seoGroups } from './seoFields'

export const postType = defineType({
  name: 'post',
  title: 'Blog članak',
  type: 'document',
  groups: seoGroups,
  fields: [
    defineField({ name: 'title', title: 'Naslov', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'publishedAt', title: 'Datum objave', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'modifiedAt', title: 'Datum izmene', type: 'datetime' }),
    defineField({
      name: 'mainImage',
      title: 'Naslovna slika',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt tekst', type: 'string' })],
    }),
    defineField({ name: 'excerpt', title: 'Kratak opis', type: 'text', rows: 3 }),
    defineField({
      name: 'categories',
      title: 'Kategorije bloga',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'blogCategory',
          fields: [
            defineField({ name: 'name', title: 'Naziv', type: 'string' }),
            defineField({ name: 'slug', title: 'Slug', type: 'string' }),
          ],
          preview: { select: { title: 'name', subtitle: 'slug' } },
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Sadržaj',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Citat', value: 'blockquote' },
          ],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'string', title: 'URL' }],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt tekst', type: 'string' })],
        },
      ],
    }),
    ...seoFields,
  ],
  preview: { select: { title: 'title', media: 'mainImage', subtitle: 'publishedAt' } },
  orderings: [{ title: 'Najnovije', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
})
