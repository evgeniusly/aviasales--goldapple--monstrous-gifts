import React from 'react'

import { METRIKA, YM_ID } from '~/data/analytics'

export const AnalyticsHead = (): JSX.Element | null => {
  return process.env.NODE_ENV === 'production' ? (
    <>
      {YM_ID > 0 && <script dangerouslySetInnerHTML={{ __html: METRIKA.ym.script }} type="text/javascript" />}
      {METRIKA.mailru?.script && (
        <script dangerouslySetInnerHTML={{ __html: METRIKA.mailru.script }} type="text/javascript" />
      )}
    </>
  ) : null
}

export const AnalyticsBody = (): JSX.Element | null => {
  return process.env.NODE_ENV === 'production' ? (
    <>
      {YM_ID > 0 && <noscript dangerouslySetInnerHTML={{ __html: METRIKA.ym.noscript }} />}
      {METRIKA.mailru?.noscript && <noscript dangerouslySetInnerHTML={{ __html: METRIKA.mailru.noscript }} />}
    </>
  ) : null
}
