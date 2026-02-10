import classNames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'

import classes from './ButtonToGiveaway.module.scss'

interface IButtonToGiveawayProps {
  children?: React.ReactNode
  giveawayRef?: React.RefObject<HTMLDivElement>
  className?: string
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export const ButtonToGiveaway: React.FC<IButtonToGiveawayProps> = ({
  children = <>Розыгрыш там</>,
  giveawayRef,
  className,
  onClick,
}) => {
  const [isVisible, setIsVisible] = useState(true)

  const toGiveawayClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (typeof onClick === 'function') onClick(e)
      const _target = giveawayRef?.current ?? document.getElementById('giveaway')
      _target?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    },
    [onClick],
  )

  useEffect(() => {
    const onScroll = (): void => setIsVisible(document.documentElement.scrollTop < 200)
    window.addEventListener('scroll', onScroll)
    return (): void => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={classNames(classes.buttonToGiveaway, className, !isVisible && classes.buttonToGiveawayHidden)}
      onClick={toGiveawayClick}
    >
      <svg className={classes.icon} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.93934 17.0607C5.35355 16.4749 5.35355 15.5251 5.93934 14.9393L15.4853 5.3934C16.0711 4.80761 17.0208 4.80761 17.6066 5.3934C18.1924 5.97919 18.1924 6.92893 17.6066 7.51472L9.12132 16L17.6066 24.4853C18.1924 25.0711 18.1924 26.0208 17.6066 26.6066C17.0208 27.1924 16.0711 27.1924 15.4853 26.6066L5.93934 17.0607ZM25 14.5C25.8284 14.5 26.5 15.1716 26.5 16C26.5 16.8284 25.8284 17.5 25 17.5L25 16L25 14.5ZM7 16L7 14.5L25 14.5L25 16L25 17.5L7 17.5L7 16Z"
          fill="#161618"
        />
      </svg>
      {children}
    </div>
  )
}
