import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface IGameStore {
  isTested: boolean
  anwerIds: number[]

  setIsTested: () => void
  setAnswerIds: (ids: number[]) => void
  resetAll: () => void
}

const initialState = {
  isTested: false,
  anwerIds: [],
}

export const useGameStore = create<IGameStore>()(
  immer((set) => ({
    ...initialState,

    setIsTested: (): void => {
      set((state) => {
        state.isTested = true
      })
    },

    setAnswerIds: (ids): void => {
      set((state) => {
        state.anwerIds = [...ids]
      })
    },

    resetAll: (): void => {
      set(initialState)
    },
  })),
)
