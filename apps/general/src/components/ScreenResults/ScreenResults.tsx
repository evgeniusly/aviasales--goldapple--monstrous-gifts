import classNames from 'classnames'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import buttonNextRound from '@assets/images/buttonNextRound.svg?url'
import cardPromoLeft from '@assets/images/cardPromoLeft.png'
import cardPromoRight from '@assets/images/cardPromoRight.png'

import { preloads, questions } from '~/data'
import { useAppStore } from '~/store/appStore'
import { useGameStore } from '~/store/gameStore'
import assetPreloader from '~/utils/assetPreloader'

import { Button } from '../Button'
import { GiveawayDefault } from '../GiveawayDefault'

import classes from './ScreenResults.module.scss'

export const ScreenResults: React.FC = () => {
  const isScreenInvisible = useAppStore((state) => state.isScreenInvisible)
  const deviceType = useAppStore((state) => state.deviceType)
  const deskMob = useAppStore((state) => state.deskMob)
  const gotoGame = useAppStore((state) => state.gotoGame)
  const isTested = useGameStore((state) => state.isTested)
  const anwerIds = useGameStore((state) => state.anwerIds)
  const resetAll = useGameStore((state) => state.resetAll)

  const [cardSelectedId, setCardSelectedId] = useState(0)

  const [isTestedLocal, resultData] = useMemo(() => {
    return [isTested, isTested ? anwerIds.map((id) => questions[id]?.result) : []]
  }, []) // do not subscribe this !

  const onRestartClick = useCallback(() => {
    resetAll()
    gotoGame()
  }, [resetAll])

  const selectCard = useCallback((id: number) => {
    setCardSelectedId(id)
  }, [])

  const nextCard = useCallback(() => {
    setCardSelectedId((prev) => (prev + 1) % anwerIds.length)
  }, [anwerIds])
  const prevCard = useCallback(() => {
    setCardSelectedId((prev) => (prev - 1 + anwerIds.length) % anwerIds.length)
  }, [anwerIds])

  useEffect(() => {
    if (deviceType === 'unknown') return
    void assetPreloader([...preloads.preGame, ...deskMob(preloads.preGameDesk, preloads.preGameMob)])
  }, [deviceType])

  return (
    <div className={classNames(classes.results, 'screen', isScreenInvisible && 'screenInvisible')}>
      <div className={classes.content}>
        <div className={classes.result}>
          <div className={classes.resultTitle}>Ваша подборка чудовищных подарков</div>

          {isTestedLocal && (
            <>
              <div className={classes.resultCards}>
                {resultData.map((result, cardId) => (
                  <div
                    key={cardId}
                    className={classNames(
                      classes.resultCardWrap,
                      cardId === cardSelectedId && classes.resultCardWrapActive,
                      (cardId + 1 + anwerIds.length) % anwerIds.length === cardSelectedId && classes.resultCardWrapLeft,
                      (cardId - 1 + anwerIds.length) % anwerIds.length === cardSelectedId &&
                        classes.resultCardWrapRight,
                    )}
                  >
                    <div className={classes.resultCard} onClick={() => selectCard(cardId)}>
                      <img className={classes.resultCardImage} src={result.image} alt="" draggable="false" />
                      <div className={classes.resultCardNumber}>Чудовищный подарок №{result.number}</div>
                      <div className={classes.resultCardTitle}>{result.title}</div>
                      <div className={classes.resultCardForWho}>
                        <b>Кому:</b> {result.forWho}
                      </div>
                      <div className={classes.resultCardText}>{result.text}</div>
                    </div>

                    <div className={classes.resultCardPromoWrap}>
                      <img className={classes.cardPromoLeft} src={cardPromoLeft} alt="" draggable="false" />
                      <img className={classes.cardPromoRight} src={cardPromoRight} alt="" draggable="false" />
                      <div className={classes.resultCardPromo}>{result.promo}</div>
                    </div>
                  </div>
                ))}

                <img className={classes.buttonNext} src={buttonNextRound} alt="" draggable="false" onClick={nextCard} />
                <img className={classes.buttonPrev} src={buttonNextRound} alt="" draggable="false" onClick={prevCard} />
              </div>

              <div className={classes.resultPaginator}>
                {resultData.map((_, cardId) => (
                  <svg
                    className={classNames(
                      classes.resultPaginatorItem,
                      cardId === cardSelectedId && classes.resultPaginatorItemSelected,
                    )}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => selectCard(cardId)}
                  >
                    <circle cx="8" cy="8" r="6.5" stroke="#161618" strokeWidth="3" />
                  </svg>
                ))}
              </div>

              <div className={classes.resultActions}>
                <Button onClick={onRestartClick}>Выбрать другие</Button>
              </div>
            </>
          )}
        </div>

        <div className={classes.bottom}>
          <GiveawayDefault />
        </div>
      </div>
    </div>
  )
}
