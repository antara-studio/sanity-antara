export default {
  title: 'Services',
  name: 'services',
  type: 'document',
  fields: [
    {
      name: 'mainTitle',
      type: 'mainTitle',
      title: 'Hero Title',
    },
    {
      name: 'color',
      title: 'Favorite color',
      type: 'color',
    },
    {
      name: 'featured',
      type: 'featured',
      title: 'Featured Content',
    },
    {
      name: 'services',
      type: 'object',
      title: 'Services',
      options: {
        collapsible: true,
        collapsed: false,
      },

      fields: [
        {
          name: 'brand',
          type: 'array',
          title: 'Brand',
          of: [{ type: 'string' }],
        },
        {
          name: 'design',
          type: 'array',
          title: 'Design',
          of: [{ type: 'string' }],
        },
        {
          name: 'content',
          type: 'array',
          title: 'Content',
          of: [{ type: 'string' }],
        },
      ],
    },
    {
      title: 'Process',
      name: 'process',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },

      fields: [
        {
          name: 'ourprocess',
          type: 'array',
          title: 'Our process',
          of: [
            {
              title: 'Our process',
              type: 'object',
              fields: [
                {
                  title: 'Title',
                  name: 'title',
                  type: 'string',
                },
                {
                  title: 'Description',
                  name: 'description',
                  type: 'richText',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
