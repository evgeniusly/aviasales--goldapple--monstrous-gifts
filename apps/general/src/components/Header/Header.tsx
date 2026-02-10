import classNames from 'classnames'
import React from 'react'

import aviasalesLogo from '~/assets/images/aviasalesLogo.svg?url'
import clientLogo from '~/assets/images/clientLogo.svg?url'
import soundOff from '~/assets/images/soundOff.svg?url'
import soundOn from '~/assets/images/soundOn.svg?url'
import { links } from '~/data'
import { SoundName } from '~/data/sounds'
import { useAppStore } from '~/store/appStore'
import { useSoundStore } from '~/store/soundStore'

import classes from './Header.module.scss'

export const Header: React.FC = () => {
  const screenId = useAppStore((state) => state.screenId)
  const isScreenInvisible = useAppStore((state) => state.isScreenInvisible)
  const muted = useSoundStore((store) => store.muted)
  const muteToggle = useSoundStore((store) => store.muteToggle)
  const playSound = useSoundStore((store) => store.playSound)

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

          <svg className={classes.cross} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.801025 0.799988L8.80107 8.80004" stroke="#161618" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M8.80005 0.799988L0.799999 8.80004" stroke="#161618" strokeWidth="1.6" strokeLinecap="round" />
          </svg>

          <a className={classes.logoLink} href={links.client} target="_blank">
            <img src={clientLogo} className={classes.clientLogoImg} alt="" />
          </a>
        </div>

        <div className={classes.actions}>
          <a className={classes.rulesLink} href={links.rules} target="_blank">
            Правила
          </a>
          <button
            className={classes.soundBtn}
            onClick={() => {
              muteToggle()
              playSound(SoundName.button)
            }}
          >
            <img className={classes.soundBtnImg} src={muted ? soundOff : soundOn} alt="" draggable="false" />
          </button>
        </div>
      </div>
    </div>
  )
}
