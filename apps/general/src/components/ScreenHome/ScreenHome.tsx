import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'

import homeGifts from '@assets/images/homeGifts.png'
import homeParticlesClose from '@assets/images/homeParticlesClose.png'
import homeParticlesFar from '@assets/images/homeParticlesFar.png'
import homePersonBody from '@assets/images/homePersonBody.png'
import homePersonHand from '@assets/images/homePersonHand.png'

import { preloads } from '~/data'
import { useAppStore } from '~/store/appStore'
import assetPreloader from '~/utils/assetPreloader'

import { Button } from '../Button'
import { Floater } from '../Floater/Floater'
import { ParallaxByMouse } from '../ParallaxByMouse'

import classes from './ScreenHome.module.scss'

const titleTopList = ['Чудовищные', 'Ужасные', 'Кошмарные', 'Дикие', 'Беспощадные']
const titleBotList = ['мамы', 'подружки', 'брата', 'бати', 'коллеги']
const titleChangeDelayMs = 2000
const handAnimDurationMs = 200

export const ScreenHome: React.FC = () => {
  const isScreenInvisible = useAppStore((state) => state.isScreenInvisible)
  const deviceType = useAppStore((state) => state.deviceType)
  const deskMob = useAppStore((state) => state.deskMob)
  const gotoGame = useAppStore((state) => state.gotoGame)
  const gotoResults = useAppStore((state) => state.gotoResults)

  const [titleTop, setTitleTop] = useState(titleTopList[0])
  const [titleBot, setTitleBot] = useState(titleBotList[0])
  const titleTopId = useRef(0)
  const titleBotId = useRef(0)
  const isTitleTopTime = useRef(true)
  const personHandRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (deviceType === 'unknown') return
    void assetPreloader([...preloads.preGame, ...deskMob(preloads.preGameDesk, preloads.preGameMob)])
  }, [deviceType])

  useEffect(() => {
    let titleChangeTimer: NodeJS.Timeout | undefined

    const handAnim = personHandRef.current?.animate(
      [{ transform: 'none' }, { transform: 'rotate(10deg)' }, { transform: 'none' }],
      { duration: handAnimDurationMs, easing: 'ease-in-out' },
    )

    const titleTimer = setInterval(() => {
      handAnim?.play()
      titleChangeTimer = setTimeout(() => {
        if (isTitleTopTime.current) {
          titleTopId.current = (titleTopId.current + 1) % titleTopList.length
          setTitleTop(titleTopList[titleTopId.current])
        } else {
          titleBotId.current = (titleBotId.current + 1) % titleBotList.length
          setTitleBot(titleBotList[titleBotId.current])
        }
        isTitleTopTime.current = !isTitleTopTime.current
      }, handAnimDurationMs / 2)
    }, titleChangeDelayMs)

    return (): void => {
      clearInterval(titleTimer)
      clearTimeout(titleChangeTimer)
    }
  }, [])

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
          <img ref={personHandRef} className={classes.homePersonHand} src={homePersonHand} alt="" draggable="false" />
          <img className={classes.homePersonBody} src={homePersonBody} alt="" draggable="false" />
        </div>
      </Floater>

      <div className={classes.body}>
        <div className={classes.title}>
          <div className={classes.titleTopWrap}>
            <div className={classes.titleTop}>{titleTop}</div>
          </div>
          <div className={classes.titleMid}>подарки</div>
          <div className={classes.titleBot}>для {titleBot}</div>
        </div>

        <div className={classes.text}>Доверьте нашей злюке выбор подарков и&nbsp;выиграйте путешествие </div>

        <div className={classes.actions}>
          <Button glow mod={'yellow'} onClick={gotoGame}>
            Погнали
          </Button>
          <button className={classes.toResultsBtn} onClick={gotoResults}>
            Сразу к розыгрышу
          </button>
        </div>
      </div>
    </div>
  )
}
