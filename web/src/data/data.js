// EXAMPLE:

const client = require('../util/client.js')
const allBlocksToHtml = require('../util/allBlocksToHtml.js')

//not required but enables GROQ syntax highlighting in vscode with this extension:
//https://marketplace.visualstudio.com/items?itemName=sanity-io.vscode-sanity
const groq = require('groq')

module.exports = async function() {
  const permalinks = []

  const config = await client.fetch(groq`*[_type == 'config'][0]{
   info,
   seo {
     ...,
     image {
       image {
         asset->{url}
       }
     }
   },
   social

  }`)
  const home = await client.fetch(groq`*[_type == 'home'][0]{
    mainTitle,
    featured,
    split {
      title,
      pageLink,
      reversed,
      richText,
      image[] {
        alt,
        asset->{url},
        alt
      }
    },
    featuredProjects {
      style,
      projects[]-> {
        title,
        position,
        image_l {
          image {
            asset->{url},
          }
        },
        color,
        slug {
          current
        },
      }
    }
  }`)
  const about = await client.fetch(groq`*[_type == 'about'][0]{
    mainTitle,
    featured,
    color,
    split {
      title,
      subtitle,
      pageLink,
      reversed,
      richText,
      image[] {
        alt,
        asset->{url},
        alt
      }
    },
    split_2 {
      title,
      subtitle,
      pageLink,
      reversed,
      richText,
      image[] {
        alt,
        asset->{url},
        alt
      }
    },
    press {
      presslist[] {
        media,
        year, 
        logo {
        asset-> {url}
      }
      }
    }
  }`)
  const work = await client.fetch(groq`*[_type == 'work'][0]{
    mainTitle,
    color,
    featuredProjects {
      style,
      projects[]->{
        title,
        process,
        description,
        categories,
        gallery[] {
          galleryleft[] {
            asset->{url},
          },
          galleryright[] {
            asset->{url},
          },
          image {
            asset->{url},
          },
          vimeo
        },
        color,
        slug {
          current
        },
        client,
        image_s {
          alt,
          image {
            asset->{url},
          }
        },
        image_l {
          alt,
          image {
            asset->{url},
          }
        }
      }
    }
  }`)
  const services = await client.fetch(groq`*[_type == 'services'][0]`)
  const contact = await client.fetch(groq`*[_type == 'contact'][0]{
    mainTitle,
    featured,
    split {
      title,
      subtitle,
      pageLink,
      reversed,
      richText,
      image[] {
        asset->{url},
        alt
      }
    },
  }`)

  const projects = await client.fetch(groq`*[_type == 'project']{
    title,
    description,
    categories,
    color,
    slug {
      current
    },
    image_l {
      alt,
      image {
        asset->{url},
      }
    },
    process,
    gallery,
  }`)

  work.featuredProjects.projects.forEach((el, i) => {
    permalinks.push({
      ...el,
      pagination: {
        current: i,
        total: projects.length,
      },
    })
  })

  //const home = await client.fetch(groq`*[]`)

  const obj = {
    config,
    home,
    about,
    work,
    services,
    contact,
    projects,
    pagination: permalinks,
  }

  return allBlocksToHtml(obj)
}
