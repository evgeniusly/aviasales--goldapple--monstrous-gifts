import { Howl } from 'howler'

import bubble from '~/assets/sound/bubble.mp3'
import buttonSound from '~/assets/sound/button.mp3'
import loaderKeyboard from '~/assets/sound/loaderKeyboard.mp3'
import resultsShow from '~/assets/sound/resultsShow.mp3'

export enum SoundName {
  button = 'button',
  loaderKeyboard = 'loaderKeyboard',
  resultsShow = 'resultsShow',
  bubble = 'bubble',
}
export type SoundList = {
  [key in SoundName]: Howl
}

export const VOLUME_BASE = 0.5

export const SOUND_LIST: SoundList = {
  [SoundName.button]: new Howl({ src: buttonSound, volume: VOLUME_BASE }),
  [SoundName.loaderKeyboard]: new Howl({ src: loaderKeyboard, volume: VOLUME_BASE }),
  [SoundName.resultsShow]: new Howl({ src: resultsShow, volume: VOLUME_BASE }),
  [SoundName.bubble]: new Howl({ src: bubble, volume: VOLUME_BASE }),
} as const
