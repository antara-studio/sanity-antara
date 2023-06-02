export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 200),
      },
    },
    {
      title: 'Client',
      name: 'client',
      type: 'string',
    },
    {
      title: 'Categories',
      name: 'categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'color',
      title: 'Favorite color',
      type: 'color',
    },
    {
      title: 'Position',
      name: 'position',
      type: 'string',
      description: 'Used on home page for the layout',
      options: {
        list: [
          { value: 'pd1', title: 'L1' },
          { value: 'pd2', title: 'L2' },
          { value: 'pd3', title: 'L3' },
          { value: 'pd4', title: 'L4' },
          { value: 'pd5', title: 'L5' },
          { value: 'pd6', title: 'L6' },
          { value: 'pd7', title: 'L7' },
          { value: 'pd8', title: 'L8' },
          { value: 'pd9', title: 'L9' },
          { value: 'pd10', title: 'L10' },
        ],
      },
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
    {
      title: 'Featured Large',
      name: 'image_l',
      type: 'asset',
    },
    {
      title: 'Featured Small',
      name: 'image_s',
      type: 'asset',
    },
    {
      title: 'Process',
      name: 'process',
      type: 'richText',
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'gallerytype' }, { type: 'video' }],
    },
  ],
}
