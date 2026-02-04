import classNames from 'classnames'
import React, { useEffect } from 'react'

import homeGifts from '@assets/images/homeGifts.png'
import homeParticlesClose from '@assets/images/homeParticlesClose.png'
import homeParticlesFar from '@assets/images/homeParticlesFar.png'
import homePersonBody from '@assets/images/homePersonBody.png'
import homePersonHand from '@assets/images/homePersonHand.png'
import homeTitleBant from '@assets/images/homeTitleBant.svg?url'

import { preloads } from '~/data'
import { useAppStore } from '~/store/appStore'
import assetPreloader from '~/utils/assetPreloader'

import { Button } from '../Button'
import { Floater } from '../Floater/Floater'
import { ParallaxByMouse } from '../ParallaxByMouse'

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
      <ParallaxByMouse>
        <img className={classes.homeParticlesFar} src={homeParticlesFar} alt="" draggable="false" />
      </ParallaxByMouse>
      <ParallaxByMouse distance={2}>
        <img className={classes.homeParticlesClose} src={homeParticlesClose} alt="" draggable="false" />
      </ParallaxByMouse>
      <ParallaxByMouse distance={3}>
        <img className={classes.homeGifts} src={homeGifts} alt="" draggable="false" />
      </ParallaxByMouse>

      <Floater className={classes.person}>
        <div className={classes.personHolder}>
          <img className={classes.homePersonHand} src={homePersonHand} alt="" draggable="false" />
          <img className={classes.homePersonBody} src={homePersonBody} alt="" draggable="false" />
        </div>
      </Floater>

      <div className={classes.body}>
        <div className={classes.title}>
          <div className={classes.titleTopWrap}>
            <img className={classes.homeTitleBant} src={homeTitleBant} alt="" draggable="false" />
            <div className={classes.titleTop}>чудовищные</div>
          </div>
          <div className={classes.titleMid}>подарки</div>
          <div className={classes.titleBot}>для подружки</div>
        </div>

        <div className={classes.text}>Доверьте нашей злюке выбор подарков и&nbsp;выиграйте путешествие </div>

        <div className={classes.actions}>
          <Button glow onClick={gotoGame}>
            Погнали
          </Button>
          <Button mod={'yellow'} onClick={gotoResults}>
            Сразу к розыгрышу
          </Button>
        </div>
      </div>
    </div>
  )
}
