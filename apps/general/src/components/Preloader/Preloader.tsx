import React from 'react'

import classes from './Preloader.module.scss'

interface IPreloaderProps {
  progress: number
}

export const Preloader: React.FC<IPreloaderProps> = ({ progress }) => {
  return (
    <div className={classes.preloader}>
      <div className={classes.progressValue}>{Math.round(progress * 100)}%</div>
    </div>
  )
}
