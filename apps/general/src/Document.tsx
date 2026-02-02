import React from 'react'

import { Body, Head, Html, Root, Scripts } from '@modern-js/runtime/document'

import { meta } from '~/defs'

export default function Document(): JSX.Element {
  return (
    <Html lang="ru">
      <Head>
        <title>{meta.siteName}</title>
        {/* <!-- OG --> */}
        <meta name="description" content={meta.description} />
        <meta name="vk:image" content={`${meta.url}/vk.png`} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={`${meta.url}`} />
        <meta property="og:image" content={`${meta.url}/og.png`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={`${meta.url}/og.png`} />
        <link rel="icon" href={`${meta.url}/icon1.png`} type="image/png" sizes="32x32" />
        <link rel="icon" href={`${meta.url}/icon2.png`} type="image/png" sizes="144x144" />
        <link rel="apple-touch-icon" href={`${meta.url}/icon1.png`} type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href={`${meta.url}/icon2.png`} type="image/png" sizes="144x144" />
        {/* <!-- End OG --> */}
      </Head>
      <Body>
        <Root />
        <Scripts />
      </Body>
    </Html>
  )
}
