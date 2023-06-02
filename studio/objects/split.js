export default {
  name: 'split',
  type: 'object',
  title: 'Split Content',
  description: 'Two columns content (Text / Image)',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    {
      title: 'Reversed columns',
      name: 'reversed',
      type: 'boolean',
      description: 'Change columns position (Image / Text)',
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Sub Title',
    },
    {
      name: 'richText',
      type: 'richText',
      title: 'Content',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (Rule) =>
        Rule.custom((el, context) => {
          const reversed = context.document.split.reversed
          const total = el.length

          return reversed
            ? total <= 2
              ? true
              : 'Only Two images are allowed'
            : total <= 1
            ? true
            : 'Only One image is allowed'
        }),
    },
    {
      name: 'pageLink',
      type: 'pageLink',
      title: 'Page Link',
    },
  ],
}
