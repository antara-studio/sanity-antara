export default {
  name: 'featured',
  type: 'object',
  title: 'Featured',
  description: 'Featured text below the hero',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'text',
      rows: 1,
    },
    {
      title: 'Text Block',
      name: 'textblock',
      type: 'object',
      fieldsets: [{ name: 'blockwrap', title: 'Title wrap' }],
      options: {
        columns: 2,
      },
      fields: [
        {
          title: 'Text',
          name: 'text_left',
          type: 'text',
          rows: 7,
        },
        {
          title: 'Text',
          name: 'text_right',
          type: 'text',
          rows: 6,
        },
      ],
    },
    {
      name: 'pageLink',
      type: 'pageLink',
      title: 'Page Link',
    },
  ],
}
