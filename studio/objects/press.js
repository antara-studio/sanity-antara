export default {
  name: 'press',
  type: 'object',
  title: 'Press',
  description: 'Media features',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    {
      name: 'presslist',
      type: 'array',
      title: 'All press',
      of: [{ type: 'pressItem' }],
    },
  ],
}
