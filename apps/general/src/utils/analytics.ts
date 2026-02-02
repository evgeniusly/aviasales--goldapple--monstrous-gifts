import { AEVENT, PIXEL, YM_ID } from '~/data'

import { randomIntFromTo } from './helpers'

export const prepareUrl = (url: string): string => url.replace('[RANDOM]', randomIntFromTo(1000000, 9999999).toString())

export const showPixel = (pixel: string | undefined): void => {
  if (!pixel) {
    console.log('empty pixel')
    return
  }

  if (process.env.NODE_ENV === 'development') {
    const key = Object.entries(PIXEL).find((item) => item[1] === pixel)?.[0]
    console.log(`%cPIXEL show%c ${key}`, 'border-radius:3px;color:#fff;background:#256674;padding:1px 3px', '')
  } else {
    const img = document.createElement('img')
    img.src = prepareUrl(pixel)
    img.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 1px; height: 1px; visibility: hidden')
    document.body.appendChild(img)
  }
}

export const analyticsEvent = (event: keyof typeof AEVENT): void => {
  const eventValue = AEVENT[event]
  if (process.env.NODE_ENV === 'development') {
    if (!YM_ID) console.error('Yandex.Metrika ID is not set! YM_ID:', YM_ID)
    console.log(
      `%cEVENT reachGoal%c ${event as string}: ${eventValue as string}`,
      'border-radius:3px;color:#fff;background:#46824e;padding:1px 3px',
      '',
    )
  } else {
    if (typeof ym === 'function') {
      ym(YM_ID, 'reachGoal', eventValue)
    } else {
      console.log('Yandex.Metrika is not ready! Event: ', eventValue)
    }
  }
}
