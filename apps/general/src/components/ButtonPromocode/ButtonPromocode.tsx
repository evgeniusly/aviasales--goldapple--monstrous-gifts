import React, { useCallback, useEffect, useRef, useState } from 'react'

import { copyToClipboard } from '~/utils/helpers'

import classes from './ButtonPromocode.module.scss'

interface IButtonPromocodeProps {
  promocode: string
  onCopyText?: string
}

export const ButtonPromocode: React.FC<IButtonPromocodeProps> = ({ promocode, onCopyText = 'скопировано' }) => {
  const [promoButtonText, setPromoButtonText] = useState(promocode)
  const promoButtonTimerRef = useRef<NodeJS.Timeout>()

  const onPromoClick = useCallback(() => {
    clearTimeout(promoButtonTimerRef.current)
    void copyToClipboard(promocode)
    setPromoButtonText(onCopyText)
    promoButtonTimerRef.current = setTimeout(() => {
      setPromoButtonText(promocode)
    }, 2000)
  }, [promocode, onCopyText])

  useEffect(() => setPromoButtonText(promocode), [promocode])

  useEffect(() => {
    return (): void => {
      clearTimeout(promoButtonTimerRef.current)
    }
  }, [])

  return (
    <span className={classes.promoCode} onClick={onPromoClick}>
      <span className={classes.promoCodeText}>{promoButtonText}</span>

      <svg className={classes.promoCodeIcon} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="1"
          y="1.5957"
          width="12.648"
          height="14.0534"
          rx="3.37281"
          fill="black"
          stroke="white"
          strokeWidth="2"
        />
        <rect
          x="5.77734"
          y="4.96826"
          width="12.648"
          height="14.0534"
          rx="3.37281"
          fill="black"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </span>
  )
}
