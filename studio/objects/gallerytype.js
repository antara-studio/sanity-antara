export default {
  title: 'Gallery type',
  name: 'gallerytype',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'galleryleft',
      title: 'Gallery Left',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'galleryright',
      title: 'Gallery Right',
      type: 'array',
      of: [{ type: 'image' }],
    },
  ],
}
