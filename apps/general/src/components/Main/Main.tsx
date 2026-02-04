import { getApxInterface, getIsMobileInterface } from 'adaptive-pixel'
import React, { useEffect, useRef, useState } from 'react'

import { preloads } from '~/data'
import { ScreenId, useAppStore } from '~/store/appStore'
import assetPreloader from '~/utils/assetPreloader'

import { CookiesAlert } from '../CookiesAlert'
import { Header } from '../Header'
import { Preloader } from '../Preloader'
import { ScreenGame } from '../ScreenGame'
import { ScreenHome } from '../ScreenHome'
import { ScreenResults } from '../ScreenResults'

import classes from './Main.module.scss'

interface IMain {
  screen?: ScreenId
}

export const Main: React.FC<IMain> = ({ screen: screenFromProps }) => {
  const deviceType = useAppStore((state) => state.deviceType)
  const screenId = useAppStore((state) => state.screenId)
  const deskMob = useAppStore((state) => state.deskMob)
  const setDeviceType = useAppStore((state) => state.setDeviceType)
  const setScale = useAppStore((state) => state.setScale)
  const gotoGame = useAppStore((state) => state.gotoGame)
  const gotoResults = useAppStore((state) => state.gotoResults)

  const [isReady, setIsReady] = useState(false)
  const [preloaderProgress, setPreloaderProgress] = useState(0)

  const isFirstLoading = useRef(true)

  useEffect(() => {
    const apxInterface = getApxInterface({
      setter: (value) => {
        setScale(value)
      },
      breakpoints: [
        [1920, 980, 900, 540], // "Desktop"
        screenId !== 'results' ? [375, 667, 300, 300] : [375, 1, 300, 300], // "Mobile"
      ],
    })
    const isMobileInterface = getIsMobileInterface({
      setter: (isMobile) => {
        setDeviceType(isMobile ? 'mobile' : 'desktop')
      },
      maxWidth: 900,
      maxHeight: 540,
    })
    apxInterface.calculate()
    apxInterface.startListeners()
    isMobileInterface.calculate()
    isMobileInterface.startListeners()

    return (): void => {
      apxInterface.cleanListeners()
      isMobileInterface.cleanListeners()
    }
  }, [screenId])

  useEffect(() => {
    void (async (): Promise<void> => {
      if (isFirstLoading.current) {
        if (screenFromProps === 'game') gotoGame()
        if (screenFromProps === 'results') gotoResults()

        if (deviceType === 'unknown') return
        if (screenFromProps && screenFromProps !== screenId) return

        await assetPreloader(
          [
            ...([...(preloads.preApp as string[]), ...deskMob(preloads.preAppDesk, preloads.preAppMob)] as string[]),
            ...(screenId === 'home'
              ? [...preloads.preHome, ...deskMob(preloads.preHomeDesk, preloads.preHomeMob)]
              : []),
            ...(screenId === 'results'
              ? [...preloads.preResults, ...deskMob(preloads.preResultsDesk, preloads.preResultsMob)]
              : []),
          ] as string[],
          (progress) => setPreloaderProgress(progress),
        )

        setIsReady(true)
        isFirstLoading.current = false
      }
    })()
  }, [screenFromProps, screenId, deviceType])

  return (
    <div className={classes.main}>
      {!isReady && <Preloader progress={preloaderProgress} />}

      {isReady && (
        <div className={classes.mainContent}>
          <div className={classes.background}>
            <div className={classes.backLine1}></div>
            <div className={classes.backLine2}></div>
          </div>

          {screenId === 'home' && <ScreenHome />}
          {screenId === 'game' && <ScreenGame />}
          {screenId === 'results' && <ScreenResults />}

          <Header />

          <CookiesAlert />
        </div>
      )}
    </div>
  )
}
