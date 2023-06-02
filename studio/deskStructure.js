import S from '@sanity/desk-tool/structure-builder'
import React from 'react'
import Emoji from 'react-emoji-render'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Config')
        .icon(() => <Emoji style={{ fontSize: 20 }} text="⚙️" />)
        .child(
          S.editor()
            .title('Config')
            .schemaType('config')
            .documentId('config'),
        ),
      S.listItem()
        .title('Home')
        .icon(() => <Emoji style={{ fontSize: 20 }} text="🏠" />)
        .child(
          S.editor()
            .title('Home')
            .schemaType('home')
            .documentId('home'),
        ),
      S.listItem()
        .title('About')
        .icon(() => <Emoji style={{ fontSize: 22 }} text="🧘‍♀️" />)
        .child(
          S.editor()
            .title('About')
            .schemaType('about')
            .documentId('about'),
        ),
      S.listItem()
        .title('Works')
        .icon(() => <Emoji style={{ fontSize: 22 }} text="🏋️‍♀️" />)
        .child(
          S.editor()
            .title('Works')
            .schemaType('work')
            .documentId('work'),
        ),
      S.listItem()
        .title('Services')
        .icon(() => <Emoji style={{ fontSize: 22 }} text="🤹‍♂️" />)
        .child(
          S.editor()
            .title('Services')
            .schemaType('services')
            .documentId('services'),
        ),

      S.listItem()
        .title('Contact')
        .icon(() => <Emoji style={{ fontSize: 20 }} text="📞" />)
        .child(
          S.editor()
            .title('Contact')
            .schemaType('contact')
            .documentId('contact'),
        ),
      S.listItem()
        .title('Projects')
        .icon(() => <Emoji style={{ fontSize: 20 }} text="📕" />)
        .schemaType('document')
        .child(S.documentTypeList('project').title('Projects')),
    ])
