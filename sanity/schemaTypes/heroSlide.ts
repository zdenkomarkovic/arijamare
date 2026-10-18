import { defineField, defineType } from 'sanity'

export const heroSlideType = defineType({
  name: 'heroSlide',
  title: 'Hero slajd',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Fotografija',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt tekst', type: 'string' }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Redosled',
      type: 'number',
      initialValue: 0,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image', order: 'order' },
    prepare({ title, media, order }: { title?: string; media?: unknown; order?: number }) {
      return { title: title || `Slajd ${order ?? ''}`, media }
    },
  },
  orderings: [
    {
      title: 'Redosled',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
