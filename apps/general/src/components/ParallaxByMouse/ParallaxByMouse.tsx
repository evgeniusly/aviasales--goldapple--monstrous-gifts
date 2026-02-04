import classNames from 'classnames'
import React, { useEffect, useRef } from 'react'

import { useAppStore } from '~/store/appStore'

import classes from './ParallaxByMouse.module.scss'

interface IParallaxByMouse {
  children?: React.ReactNode
  distance?: number
  isRelative?: boolean
  horizontalOnly?: boolean
}

export const ParallaxByMouse: React.FC<IParallaxByMouse> = ({
  children,
  distance = 1,
  isRelative,
  horizontalOnly = false,
}) => {
  const deviceType = useAppStore((state) => state.deviceType)
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (deviceType !== 'desktop') return

    const onMouseMove = (e: MouseEvent): void => {
      if (!layerRef.current) return
      const xPos = e.clientX / window.innerWidth
      const yPos = e.clientY / window.innerHeight
      layerRef.current.style.transform =
        `translateX(${-distance * xPos + distance / 2}%) ` +
        (horizontalOnly ? '' : `translateY(${-distance * yPos + distance / 2}%)`)
    }

    document.addEventListener('mousemove', onMouseMove)
    return (): void => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [deviceType, distance, horizontalOnly])

  return (
    <div ref={layerRef} className={classNames(classes.parallaxByMouse, isRelative && classes.isRelative)}>
      {children}
    </div>
  )
}
