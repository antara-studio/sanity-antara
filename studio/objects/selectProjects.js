export default {
  name: 'selectProjects',
  type: 'object',
  title: 'Select Projects',
  fields: [
    {
      name: 'project',
      type: 'reference',
      to: [{ type: 'project' }],
    },
  ],
}
