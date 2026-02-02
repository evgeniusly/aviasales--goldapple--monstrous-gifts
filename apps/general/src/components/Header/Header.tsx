import classNames from 'classnames'
import React from 'react'

import aviasalesLogo from '~/assets/images/aviasalesLogo.svg?url'
import clientLogo from '~/assets/images/clientLogo.svg?url'
import { links } from '~/data'
import { useAppStore } from '~/store/appStore'

import classes from './Header.module.scss'

export const Header: React.FC = () => {
  const screenId = useAppStore((state) => state.screenId)
  const isScreenInvisible = useAppStore((state) => state.isScreenInvisible)

  return (
    <div
      className={classNames(
        classes.header,
        classes[`screen-${screenId}`],
        'screen',
        screenId === 'home' && isScreenInvisible && 'screenInvisible',
      )}
    >
      <div className={classes.content}>
        <div className={classes.logos}>
          <a className={classes.logoLink} href={links.aviasales} target="_blank">
            <img src={aviasalesLogo} className={classes.aviasalesLogoImg} alt="aviasales" />
          </a>

          <svg className={classes.cross} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L14 14" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 2L2 14" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <a className={classes.logoLink} href={links.client} target="_blank">
            <img src={clientLogo} className={classes.clientLogoImg} alt="" />
          </a>
        </div>

        <div className={classes.actions}>
          <a className={classes.rulesLink} href={links.rules} target="_blank">
            Правила
          </a>
        </div>
      </div>
    </div>
  )
}
