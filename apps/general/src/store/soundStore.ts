import { Howler } from 'howler'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { SOUND_LIST, SoundList, SoundName } from '~/data/sounds'

interface ISoundStore {
  muted: boolean
  sounds: SoundList

  playSound: (sound: SoundName) => void
  stopSound: (sound: SoundName) => void
  mute: () => void
  unmute: () => void
  muteToggle: () => void
}

Howler.mute(localStorage.getItem('isSoundMuted') === 'true')

export const useSoundStore = create<ISoundStore>()(
  immer((set, get) => ({
    muted: localStorage.getItem('isSoundMuted') === 'true',
    sounds: SOUND_LIST,

    playSound: (sound: SoundName): void => {
      get().sounds[sound]?.play()
    },
    stopSound: (sound: SoundName): void => {
      get().sounds[sound]?.stop()
    },
    mute: (): void => {
      if (!get().muted)
        set((state) => {
          state.muted = true
          Howler.mute(true)
          localStorage.setItem('isSoundMuted', `true`)
        })
    },
    unmute: (): void => {
      if (get().muted)
        set((state) => {
          state.muted = false
          localStorage.removeItem('isSoundMuted')
          Howler.mute(false)
        })
    },
    muteToggle: (): void => {
      set((state) => {
        state.muted = !state.muted
        Howler.mute(state.muted)
        localStorage.setItem('isSoundMuted', `${state.muted}`)
      })
    },
  })),
)
