export default {
  name: 'social',
  type: 'document',
  title: ' Social',
  fields: [
    {
      title: 'Social',
      name: 'social',
      type: 'array',
      of: [{ type: 'link' }],
      validation: (Rule) =>
        Rule.required()
          .max(6)
          .error('No more than 6'),
    },
  ],
}
