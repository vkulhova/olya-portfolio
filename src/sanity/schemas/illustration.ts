import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'illustration',
  title: 'Ілюстрація',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Зображення',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Категорія',
      type: 'string',
      options: {
        list: [
          { title: 'Персонажі', value: 'characters' },
          { title: 'Пейзажі', value: 'landscapes' },
          { title: 'Обкладинки', value: 'covers' },
          { title: 'Інше', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Опис',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Порядок відображення',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Порядок',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
