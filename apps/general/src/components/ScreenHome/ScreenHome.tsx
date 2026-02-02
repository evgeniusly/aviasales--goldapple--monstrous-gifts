import classNames from 'classnames'
import React, { useEffect } from 'react'

import { preloads } from '~/data'
import { useAppStore } from '~/store/appStore'
import assetPreloader from '~/utils/assetPreloader'

import { Button } from '../Button'

import classes from './ScreenHome.module.scss'

export const ScreenHome: React.FC = () => {
  const isScreenInvisible = useAppStore((state) => state.isScreenInvisible)
  const deviceType = useAppStore((state) => state.deviceType)
  const deskMob = useAppStore((state) => state.deskMob)
  const gotoGame = useAppStore((state) => state.gotoGame)
  const gotoResults = useAppStore((state) => state.gotoResults)

  useEffect(() => {
    if (deviceType === 'unknown') return
    void assetPreloader([...preloads.preGame, ...deskMob(preloads.preGameDesk, preloads.preGameMob)])
  }, [deviceType])

  return (
    <div className={classNames(classes.home, 'screen', isScreenInvisible && 'screenInvisible')}>
      <div className={classes.content}>
        <div className={classes.body}>
          <div className={classes.title}>Где-где&nbsp;&mdash; в&nbsp;Караганде!</div>
          <div className={classes.text}>
            Устали мечтать о&nbsp;поездке в&nbsp;Караганду? Вот вам шанс превратить свои мечты в&nbsp;реальность! Всё
            что нужно&nbsp;&mdash; ответить на&nbsp;5&nbsp;вопросов об&nbsp;угольной жемчужине Казахстана.
          </div>

          <div className={classes.actions}>
            <Button glow onClick={gotoGame}>
              Полетели
            </Button>
            <Button onClick={gotoResults}>Сразу к розыгрышу</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
