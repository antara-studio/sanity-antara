import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import config from './documents/config'
import info from './objects/info'
import seo from './objects/seo'
import asset from './objects/asset'
import link from './objects/link'
import social from './objects/social'
import title from './objects/title'
import richText from './objects/richText'
import featured from './objects/featured'
import pageLink from './objects/pageLink'
import selectProjects from './objects/selectProjects'
import featuredProjects from './objects/featuredProjects'
import split from './objects/split'
import pressItem from './objects/pressItem'
import press from './objects/press'
import galleryType from './objects/gallerytype'
import video from './objects/video'

import project from './objects/project'
import home from './objects/home'
import about from './objects/about'
import work from './objects/work'
import services from './objects/services'
import contact from './objects/contact'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    config,
    seo,
    info,
    title,
    richText,
    featured,
    link,
    social,
    asset,
    pageLink,
    selectProjects,
    featuredProjects,
    split,
    pressItem,
    press,
    galleryType,
    video,

    home,
    about,
    work,
    services,
    contact,
    project,
  ]),
})
