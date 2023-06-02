export default {
  name: 'mainTitle',
  type: 'object',
  title: 'Hero Title',
  description: 'Titles are static & styled specifically for each page',
  fieldsets: [{ name: 'title', title: 'Title wrap' }],
  options: {
    collapsible: true, // Makes the whole fieldset collapsible
    collapsed: false, // Defines if the fieldset should be collapsed by default or not
    columns: 2, // Defines a grid for the fields and how many columns it should have
  },
  fields: [
    {
      title: 'Line 1',
      name: 't1',
      type: 'string',
    },
    {
      title: 'Line 2',
      name: 't2',
      type: 'string',
    },
    {
      title: 'Line 3',
      name: 't3',
      type: 'string',
    },
    {
      title: 'Line 4',
      name: 't4',
      type: 'string',
    },
    {
      title: 'Caption Top',
      name: 'caption_1',
      type: 'text',
      rows: 5,
    },
    {
      title: 'Caption Bottom',
      name: 'caption_2',
      type: 'text',
      rows: 5,
    },
  ],
}
