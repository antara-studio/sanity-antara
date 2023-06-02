export default {
  name: 'featuredProjects',
  type: 'object',
  title: 'Project',
  description: 'Select featured projects',
  options: {
    collapsible: true,
    collapsed: false,
  },

  fields: [
    {
      title: 'Type / Grid',
      name: 'style',
      type: 'boolean',
      description: 'Choose layout (Type / Grid)',
    },
    {
      name: 'projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
    },
  ],
}
