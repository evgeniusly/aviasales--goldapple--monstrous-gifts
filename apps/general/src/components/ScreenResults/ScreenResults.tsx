import classNames from 'classnames'
import React, { useCallback, useEffect, useMemo } from 'react'

import { preloads, resultEmpty, results } from '~/data'
import { useAppStore } from '~/store/appStore'
import { useGameStore } from '~/store/gameStore'
import assetPreloader from '~/utils/assetPreloader'

import { Button } from '../Button'
import { GiveawayDefault } from '../GiveawayDefault'

import classes from './ScreenResults.module.scss'

export const ScreenResults: React.FC = () => {
  const isScreenInvisible = useAppStore((state) => state.isScreenInvisible)
  const deviceType = useAppStore((state) => state.deviceType)
  const deskMob = useAppStore((state) => state.deskMob)
  const gotoGame = useAppStore((state) => state.gotoGame)
  const correctCount = useGameStore((state) => state.correctCount)
  const isTested = useGameStore((state) => state.isTested)
  const resetAll = useGameStore((state) => state.resetAll)

  const resultData = useMemo(() => {
    return !isTested ? resultEmpty : results.find((item) => correctCount >= item.min) || resultEmpty
  }, []) // do not subscribe this !

  const onRestartClick = useCallback(() => {
    resetAll()
    gotoGame()
  }, [resetAll])

  useEffect(() => {
    if (deviceType === 'unknown') return
    void assetPreloader([...preloads.preGame, ...deskMob(preloads.preGameDesk, preloads.preGameMob)])
  }, [deviceType])

  return (
    <div className={classNames(classes.results, 'screen', isScreenInvisible && 'screenInvisible')}>
      <div className={classes.content}>
        <div className={classes.top}>
          <div className={classes.result}>
            <div className={classes.resultInfo}>
              <div className={classes.resultTitle}>{resultData.title}</div>
              <div className={classes.resultText}>{resultData.text}</div>
              <div className={classes.resultActions}>
                <Button onClick={onRestartClick}>{resultData.restartBtnText}</Button>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.bottom}>
          <GiveawayDefault />
        </div>
      </div>
    </div>
  )
}
