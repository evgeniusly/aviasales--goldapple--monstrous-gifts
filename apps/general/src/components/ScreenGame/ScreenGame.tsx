import classNames from 'classnames'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import gameParticlesClose from '@assets/images/gameParticlesClose.png'
import gameParticlesFar from '@assets/images/gameParticlesFar.png'
import loaderAnim from '@assets/images/loader.webp'
import loaderParticles from '@assets/images/loaderParticles.png'
import personIngame from '@assets/images/personIngame80.webp'

import { answerLimit, preloads, questions } from '~/data'
import { LOADER_TEXT_DURATION_MS, loaderTexts } from '~/data/loader'
import { useAppStore } from '~/store/appStore'
import assetPreloader from '~/utils/assetPreloader'

import { Button } from '../Button'
import { ParallaxByMouse } from '../ParallaxByMouse'

import classes from './ScreenGame.module.scss'

export const ScreenGame: React.FC = () => {
  const deviceType = useAppStore((state) => state.deviceType)
  const isScreenInvisible = useAppStore((state) => state.isScreenInvisible)
  const deskMob = useAppStore((store) => store.deskMob)
  const gotoResults = useAppStore((store) => store.gotoResults)

  const [answerCount, setAnswerCount] = useState(0)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isSubmitTip, setIsSubmitTip] = useState(false)
  const [isEnding, setIsEnding] = useState(false)
  const [loaderTextId, setLoaderTextId] = useState(0)

  const submitTipTimerRef = useRef<NodeJS.Timeout>()
  const loaderTimerRef = useRef<NodeJS.Timeout>()
  const loaderTitleId = useRef(0)

  const onOptionClick = useCallback(
    (id: number) => {
      setIsSubmitTip(false)

      // remove only
      if (selectedIds.includes(id)) {
        const newList = selectedIds.filter((someId) => someId !== id)
        setSelectedIds(newList)
        setAnswerCount(newList.length)
        return
      }

      // limit check
      if (answerCount >= answerLimit) return

      // add new
      const newList = [...selectedIds, id]
      setSelectedIds(newList)
      setAnswerCount(newList.length)
    },
    [selectedIds, answerCount],
  )

  const onSubmitClick = useCallback(() => {
    if (answerCount < answerLimit) {
      clearTimeout(submitTipTimerRef.current)
      setIsSubmitTip(true)
      submitTipTimerRef.current = setTimeout(() => {
        setIsSubmitTip(false)
      }, 2000)
      return
    }

    setIsEnding(true)

    // let isLoaderDone = false
    loaderTimerRef.current = setInterval(() => {
      // if (isLoaderDone) {
      //   clearInterval(loaderTimerRef.current)
      //   gotoResults()
      //   return
      // }
      loaderTitleId.current += 1
      if (loaderTexts[loaderTitleId.current]) {
        setLoaderTextId(loaderTitleId.current)
      } else {
        // isLoaderDone = true
        clearInterval(loaderTimerRef.current)
        gotoResults()
      }
    }, LOADER_TEXT_DURATION_MS)
  }, [answerCount, answerLimit])

  useEffect(() => {
    if (deviceType === 'unknown') return
    void assetPreloader([
      ...preloads.inGame,
      ...deskMob(preloads.inGameDesk, preloads.inGameMob),
      ...preloads.preResults,
      ...deskMob(preloads.preResultsDesk, preloads.preResultsMob),
    ])
  }, [deviceType])

  useEffect(() => {
    return (): void => {
      clearTimeout(submitTipTimerRef.current)
      clearInterval(loaderTimerRef.current)
    }
  }, [])

  return (
    <div className={classNames(classes.game, 'screen', isScreenInvisible && 'screenInvisible')}>
      {!isEnding && (
        <div className={classes.process}>
          <ParallaxByMouse>
            <img className={classes.gameParticlesFar} src={gameParticlesFar} alt="" draggable="false" />
          </ParallaxByMouse>
          <ParallaxByMouse distance={2}>
            <img className={classes.gameParticlesClose} src={gameParticlesClose} alt="" draggable="false" />
          </ParallaxByMouse>

          <img className={classes.person} src={personIngame} alt="" draggable="false" />

          <div className={classes.content}>
            <div className={classes.body}>
              <div className={classes.progressSection}>
                <div className={classes.progressBar}>
                  <div
                    className={classes.progressBarValue}
                    style={{ width: `${(answerCount * 100) / answerLimit}%` }}
                  ></div>
                </div>
                <div className={classes.progressCounter}>
                  {answerCount} / {answerLimit}
                </div>
              </div>

              <div className={classes.title}>Кому дарим чудовищный подарок?</div>
              <div className={classes.subtitle}>Выберите три характеристики</div>

              <div className={classes.options}>
                {questions.map(({ option }, questionId) => (
                  <div
                    key={questionId}
                    className={classNames(classes.option, selectedIds.includes(questionId) && classes.optionSelected)}
                    onClick={() => onOptionClick(questionId)}
                  >
                    {option}
                  </div>
                ))}
              </div>

              <div className={classes.actions}>
                <div className={classes.submitWrap} onClick={onSubmitClick}>
                  <Button mod={'yellow'} disabled={selectedIds.length < answerLimit}>
                    Подобрать подарки
                  </Button>
                  {isSubmitTip && <div className={classes.submitTip}>Нужно выбрать три характеристики</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEnding && (
        <div className={classes.loader}>
          <img className={classes.loaderParticles} src={loaderParticles} alt="" draggable="false" />
          <img className={classes.loaderAnim} src={loaderAnim} alt="" draggable="false" />
          <img
            key={loaderTextId}
            className={classNames(classes.loaderText, classes[`loaderText-${loaderTextId}`])}
            src={loaderTexts[loaderTextId]}
            alt=""
            draggable="false"
          />
        </div>
      )}
    </div>
  )
}
