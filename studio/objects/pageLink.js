export default {
  name: 'pageLink',
  type: 'object',
  title: 'Page Link',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'SubTitle',
    },
    {
      name: 'link',
      type: 'string',
      options: {
        list: [
          { value: '/', title: 'Home' },
          { value: '/about', title: 'About' },
          { value: '/work', title: 'Work' },
          { value: '/services', title: 'Services' },
          { value: '/contact', title: 'Contact' },
        ],
      },
    },
    {
      name: 'text',
      type: 'text',
      title: 'Text',
      rows: 4,
    },
  ],
}
