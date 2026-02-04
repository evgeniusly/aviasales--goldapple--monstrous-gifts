import classNames from 'classnames'
import React, { useMemo } from 'react'

import classes from './Floater.module.scss'

interface IFloaterProps {
  children?: React.ReactNode
  className?: string
  dirationMin?: number
  dirationMax?: number
  range?: number
}

export const Floater: React.FC<IFloaterProps> = ({
  children,
  className,
  dirationMin = 4,
  dirationMax = 8,
  range = 10,
}) => {
  const [durationX, delayX, durationY, delayY] = useMemo(() => {
    return [
      Math.random() * (dirationMax - dirationMin + 1) + dirationMin,
      Math.random() * (dirationMax - dirationMin + 1) + dirationMin,
      Math.random() * (dirationMax - dirationMin + 1) + dirationMin,
      Math.random() * (dirationMax - dirationMin + 1) + dirationMin,
    ]
  }, [dirationMin, dirationMax])

  return (
    <div className={classNames(classes.floater, className)}>
      <div
        className={classes.vertical}
        style={
          {
            animationDuration: `${durationY}s`,
            animationDelay: `-${delayY}s`,
            '--range': `${range / 2}`,
          } as React.CSSProperties
        }
      >
        <div
          className={classes.horizontal}
          style={
            {
              animationDuration: `${durationX}s`,
              animationDelay: `-${delayX}s`,
              '--range': `${range / 2}`,
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </div>
    </div>
  )
}
