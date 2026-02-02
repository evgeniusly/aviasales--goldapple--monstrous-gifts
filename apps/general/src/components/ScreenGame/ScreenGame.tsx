import classNames from 'classnames'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { TestQuestion } from '@kosyanmedia/devcom-spec-uikit/dist/collections'

import { preloads, questions } from '~/data'
import { useAppStore } from '~/store/appStore'
import { useGameStore } from '~/store/gameStore'
import assetPreloader from '~/utils/assetPreloader'

import classes from './ScreenGame.module.scss'

export const ScreenGame: React.FC = () => {
  const deviceType = useAppStore((state) => state.deviceType)
  const isScreenInvisible = useAppStore((state) => state.isScreenInvisible)
  const deskMob = useAppStore((store) => store.deskMob)
  const hideScreen = useAppStore((store) => store.hideScreen)
  const showScreen = useAppStore((store) => store.showScreen)

  const questionId = useGameStore((store) => store.questionId)
  const setAnswer = useGameStore((store) => store.setAnswer)
  const goNext = useGameStore((store) => store.goNext)

  const [isAnswered, setIsAnswered] = useState(false)

  const timers = useRef<{ [key: string]: NodeJS.Timeout }>({})

  const questionData = useMemo(() => {
    return questions[questionId]
  }, [questionId])

  const onGoNext = useCallback(() => {
    if (questionId + 1 < questions.length) {
      hideScreen()
      timers.current.onQuestionChange = setTimeout(() => {
        goNext()
        setIsAnswered(false)
        showScreen()
      }, 600)
    } else {
      goNext()
    }
  }, [questionId, hideScreen, goNext, showScreen])

  useEffect(() => {
    return (): void => {
      Object.values(timers.current).forEach((timer) => {
        clearTimeout(timer)
      })
    }
  }, [])

  const setChosenAnswer = useCallback(
    (value: string) => {
      const answerData = questions[questionId].answers.find((item) => item.value === value)
      setAnswer(!!answerData?.isCorrect)
      setIsAnswered(true)
    },
    [questionId, setAnswer],
  )

  useEffect(() => {
    if (deviceType === 'unknown') return
    void assetPreloader([
      ...preloads.inGame,
      ...deskMob(preloads.inGameDesk, preloads.inGameMob),
      ...preloads.preResults,
      ...deskMob(preloads.preResultsDesk, preloads.preResultsMob),
    ])
  }, [deviceType])

  return (
    <div className={classNames(classes.game, 'screen', isScreenInvisible && 'screenInvisible')}>
      <div className={classes.content}>
        <div className={classes.body}>
          <TestQuestion
            key={questionId}
            currentQuestion={questionId + 1}
            totalQuestions={questions.length}
            questionText={questionData.questionText}
            answers={questionData.answers}
            onAnswerClick={setChosenAnswer}
            buttonText={questionData.btnNext}
            onButtonClick={onGoNext}
            classes={{
              className: classes.test,
              infoClassName: classes.counter,
              infoTextClassName: classes.counterText,
              questionClassName: classNames(classes.question, isAnswered && classes.questionAnswered),
              answersContainerClassName: classes.answers,
              answerClassName: classes.answer,
              infoAfterAnswerContainerClassName: classes.result,
              infoAfterAnswerCorrectTitleClassName: classes.resultTitle,
              infoAfterAnswerWrongTitleClassName: classes.resultTitle,
              infoAfterAnswerTextClassName: classes.resultText,
              infoAfterAnswerDividerClassName: classes.devider,
              infoAfterAnswerButtonClassName: classes.button,
            }}
          />
        </div>
      </div>
    </div>
  )
}
