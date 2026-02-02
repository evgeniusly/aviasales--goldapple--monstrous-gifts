import { create } from 'zustand'

import { deadlineDate } from '~/defs'

export type ScreenId = null | 'home' | 'game' | 'results'
type DeviceType = 'unknown' | 'desktop' | 'mobile' | 'tablet'

interface IAppStore {
  deviceType: DeviceType
  scale: number

  screenId: ScreenId
  nextScreen: ScreenId
  isScreenInvisible: boolean

  isDeadlined: boolean

  setDeviceType: (value: DeviceType) => void
  setScale: (value: number) => void
  deskMob: <T, K>(desk: T, mob: K) => T | K

  hideScreen: () => void
  showScreen: () => void
  gotoScreen: (id: ScreenId) => void
  gotoHome: () => void
  gotoGame: () => void
  gotoResults: () => void
}

const timeouts: { onFadedOut?: NodeJS.Timeout; onFadedIn?: NodeJS.Timeout } = {}

export const useAppStore = create<IAppStore>((set, get) => ({
  deviceType: 'unknown',
  scale: 1,

  screenId: 'home',
  nextScreen: null,
  isScreenInvisible: false,

  get isDeadlined(): boolean {
    return new Date() > deadlineDate
  },

  setDeviceType: (value): void => {
    set({ deviceType: value })
  },
  setScale: (value): void => {
    set({ scale: value })
  },
  deskMob: <T, K>(desk: T, mob: K): T | K => {
    return get().deviceType !== 'mobile' ? desk : mob
  },

  hideScreen: (): void => {
    set({ isScreenInvisible: true })
  },
  showScreen: (): void => {
    set({ isScreenInvisible: false })
  },

  gotoScreen: (id): void => {
    clearTimeout(timeouts.onFadedOut)
    set({ nextScreen: id, isScreenInvisible: true })
    timeouts.onFadedOut = setTimeout(() => {
      set({ screenId: id })

      if (id === 'results') {
        window.history.pushState('result', 'result', '/result')
      } else {
        window.history.pushState('/', '/', '/')
      }

      timeouts.onFadedIn = setTimeout(() => {
        set({ isScreenInvisible: false })
      }, 60)
    }, 600)
  },

  gotoHome: (): void => {
    get().gotoScreen('home')
  },

  gotoGame: (): void => {
    get().gotoScreen('game')
  },

  gotoResults: (): void => {
    get().gotoScreen('results')
  },
}))
