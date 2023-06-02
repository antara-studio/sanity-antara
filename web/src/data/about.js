// EXAMPLE:

const client = require('../util/client.js')
const allBlocksToHtml = require('../util/allBlocksToHtml.js')

//not required but enables GROQ syntax highlighting in vscode with this extension:
//https://marketplace.visualstudio.com/items?itemName=sanity-io.vscode-sanity
const groq = require('groq')

module.exports = async function() {
  // const data = client.fetch(groq`*[_type == 'project']`)
  //const home = client.fetch(groq`*[_type == 'home']`)

  const about = await client.fetch(groq`*[_type == 'about']{mainTitle }[0]`)

  return about
}
