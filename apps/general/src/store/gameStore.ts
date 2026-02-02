import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { questions } from '~/data'

import { useAppStore } from './appStore'

interface IGameStore {
  questionId: number
  correctCount: number
  isTested: boolean

  goNext: () => void
  setAnswer: (isCorrect: boolean) => void
  resetAll: () => void
}

const initialState = {
  questionId: 0,
  correctCount: 0,
  isTested: false,
}

export const useGameStore = create<IGameStore>()(
  immer((set) => ({
    ...initialState,

    goNext: (): void => {
      set((state) => {
        state.isTested = true
        if (state.questionId + 1 < questions.length) {
          state.questionId += 1
        } else {
          useAppStore.getState().gotoResults()
        }
      })
    },

    setAnswer: (isCorrect): void => {
      if (isCorrect)
        set((state) => {
          state.correctCount += 1
        })
    },

    resetAll: (): void => {
      set(initialState)
    },
  })),
)
