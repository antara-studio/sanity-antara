const client = require('@sanity/client')

module.exports = client({
  projectId: 'hevn7efc',
  dataset: 'production',
  useCdn: false,
})
