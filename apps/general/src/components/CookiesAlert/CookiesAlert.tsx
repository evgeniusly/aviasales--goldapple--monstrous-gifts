import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { links } from '~/data'
import { useAppStore } from '~/store/appStore'

import classes from './CookiesAlert.module.scss'

export const CookiesAlert: React.FC = () => {
  const screenId = useAppStore((state) => state.screenId)

  const [isShowed, setIsShowed] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cokiesAccepted')) setIsShowed(true)
  }, [])

  if (typeof document === 'undefined') return null

  return isShowed
    ? createPortal(
        <div className={classNames(classes.cookies, screenId === 'game' && classes.contentInverted)}>
          <div className={classes.text}>
            Мы&nbsp;используем куки&nbsp;&mdash; про них можно почитать{' '}
            <a href={links.privacy} target="_blank">
              в&nbsp;правилах
            </a>
          </div>
          <div>
            <button
              className={classes.button}
              onClick={() => {
                localStorage.setItem('cokiesAccepted', 'true')
                setIsShowed(false)
              }}
            >
              Ок
            </button>
          </div>
        </div>,
        document.body,
      )
    : null
}
