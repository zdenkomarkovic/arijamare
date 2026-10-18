import { defineField, defineType } from 'sanity'
import { seoFields, seoGroups } from './seoFields'

// Statične stranice: O nama, Kontakt, Politika privatnosti i kategorijske landing stranice
export const sitePageType = defineType({
  name: 'sitePage',
  title: 'Stranica',
  type: 'document',
  groups: seoGroups,
  fields: [
    defineField({ name: 'title', title: 'Naslov', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug (putanja)',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
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
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
})
