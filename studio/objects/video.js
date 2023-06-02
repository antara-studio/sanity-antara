export default {
  name: 'video',
  type: 'object',
  title: 'Video',
  description: 'URL from Vimeo',
  options: {
    collapsible: true, // Makes the whole fieldset collapsible
    collapsed: false, // Defines if the fieldset should be collapsed by default or not
    columns: 2, // Defines a grid for the fields and how many columns it should have
  },
  fields: [
    {
      title: 'Video URL',
      name: 'vimeo',
      type: 'string',
    },
  ],
}
