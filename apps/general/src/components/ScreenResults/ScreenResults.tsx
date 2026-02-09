import classNames from 'classnames'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import buttonNextRound from '@assets/images/buttonNextRound.svg?url'
import cardPromoLeft from '@assets/images/cardPromoLeft.png'
import cardPromoRight from '@assets/images/cardPromoRight.png'
import promo80 from '@assets/images/promo80.webp'
import promoBoxes from '@assets/images/promoBoxes.png'
import resEmpty from '@assets/images/resEmpty.png'

import { links, preloads, questions } from '~/data'
import { useAppStore } from '~/store/appStore'
import { useGameStore } from '~/store/gameStore'
import assetPreloader from '~/utils/assetPreloader'

import { Button } from '../Button'
import { ButtonPromocode } from '../ButtonPromocode'
import { GiveawayDefault } from '../GiveawayDefault'

import classes from './ScreenResults.module.scss'

export const ScreenResults: React.FC = () => {
  const isScreenInvisible = useAppStore((state) => state.isScreenInvisible)
  const deviceType = useAppStore((state) => state.deviceType)
  const isDeadlined = useAppStore((state) => state.isDeadlined)
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
                      <div className={classes.resultCardPromo}>
                        <div className={classes.resultCardPromoText}>{result.promo}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {deskMob(
                  <>
                    <img
                      className={classes.buttonNext}
                      src={buttonNextRound}
                      alt=""
                      draggable="false"
                      onClick={nextCard}
                    />
                    <img
                      className={classes.buttonPrev}
                      src={buttonNextRound}
                      alt=""
                      draggable="false"
                      onClick={prevCard}
                    />
                  </>,
                  null,
                )}
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
            </>
          )}

          {!isTestedLocal && (
            <div className={classes.resultEmptyWrap}>
              <div className={classes.resultCardWrap}>
                <div className={classes.resultCard}>
                  <img className={classes.resultCardImage} src={resEmpty} alt="" draggable="false" />
                  <div className={classes.resultCardNumber}>Чудовищный подарок №0</div>
                  <div className={classes.resultCardTitle}>Целое ничего</div>
                  <div className={classes.resultCardForWho}>
                    <b>Кому:</b> непонятно кому
                  </div>
                  <div className={classes.resultCardText}>
                    Вы&nbsp;перешли сразу к&nbsp;розыгрышу, и&nbsp;ваши близкие остались без ужасных подарков.
                    Но&nbsp;подобрать их&nbsp;ещё не&nbsp;поздно!
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={classNames(classes.resultActions, !isTestedLocal && classes.resultEmptyActions)}>
            <Button onClick={onRestartClick}>{isTestedLocal ? 'Выбрать другие' : 'Подобрать подарки'}</Button>
          </div>
        </div>

        {!isDeadlined && (
          <div className={classes.promoWrap}>
            <div className={classes.promoBg}></div>

            <div className={classes.promoBody}>
              <div className={classes.promoTitle}>А&nbsp;где искать хорошие подарки?</div>
              <div className={classes.promoText}>
                <p>
                  Тонко намекаем:{' '}
                  <a href={links.client} target="_blank">
                    в&nbsp;&laquo;Золотом Яблоке&raquo;
                  </a>
                  . Категорий товаров там больше, чем кажется: есть и&nbsp;техника, и&nbsp;декор, и&nbsp;одежда.
                  А&nbsp;выбранные подарки доставят домой, в&nbsp;офис, пункт выдачи или ближайший магазин&nbsp;&mdash;
                  куда захотите.
                </p>
                <p>
                  Начать выбирать подарки можно с&nbsp;подборки, которую команда &laquo;Золотого Яблока&raquo; сделала
                  специально для этого проекта:
                </p>
              </div>
              <div className={classes.promoActions}>
                <Button>Смотреть подборку</Button>
              </div>
            </div>

            <div className={classes.promoCodeWrap}>
              <div className={classes.promoCodeTitle}>скидка до&nbsp;20% *</div>
              <div className={classes.promoCodeText}>На&nbsp;первый заказ по&nbsp;промокоду</div>
              <div className={classes.promoCodeButton}>
                <ButtonPromocode promocode="АВИАСЕЙЛС" />
              </div>
            </div>

            <div className={classes.promoIllustration}>
              <img className={classes.promoBoxes} src={promoBoxes} alt="" draggable="false" />
              <img className={classes.promo80} src={promo80} alt="" draggable="false" />
            </div>
          </div>
        )}

        <div className={classes.bottom}>
          <GiveawayDefault />
        </div>

        {!isDeadlined && (
          <div className={classes.legal}>
            <p>
              *Размер скидки зависит от&nbsp;суммы заказа, промокод действует до&nbsp;NN.NN.NN. Подробности&nbsp;&mdash;{' '}
              <a href={links.rules} target="_blank">
                в&nbsp;правилах
              </a>
            </p>
            <p>
              **Разыгрываются баллы на&nbsp;покупку авиабилетов у&nbsp;Авиасейлс, подробности&nbsp;&mdash;{' '}
              <a href={links.rules} target="_blank">
                в&nbsp;правилах
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
