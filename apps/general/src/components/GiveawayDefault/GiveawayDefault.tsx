import React, { useRef } from 'react'

import { Registration, useGiveaway } from '@kosyanmedia/devcom-spec-uikit/dist/collections'
import { SmartCaptcha } from '@kosyanmedia/devcom-spec-uikit/dist/elements'
import { SubscriptionsForm } from '@kosyanmedia/devcom-spec-uikit/dist/modules'
import { SubscriptionProps } from '@kosyanmedia/devcom-spec-uikit/dist/modules/SubscriptionsForm/Subscription'

import { emailFormData, giveawayTexts, shareFormData, subscriptionFormData } from '~/data'
import { winnersLink, winnersList } from '~/defs'
import { useAppStore } from '~/store/appStore'

import classes from './GiveawayDefault.module.scss'

export const GiveawayDefault: React.FC = () => {
  const isDeadlined = useAppStore((state) => state.isDeadlined)

  const captchaRef = useRef<{ value: string | null }>(null)
  // const altchaRef = useRef<{ value: string | null }>(null)

  // Giveaway statuses from GiveawayContext
  // const { email, hasShared, isSubscribedAviasales, isSubscribedPartner } = useContext(GiveawayContext)

  const { state, networkError, aviasalesInfo, partnerInfo, handleRegister, handleShare } = useGiveaway({
    isDevelopment: process.env.NODE_ENV === 'development',
    captchaRef: captchaRef,
    subscriptionFormData: subscriptionFormData,
    // shouldSkipShareForm: false,
    // shouldControlSubscriptions: false,
    // onRegister: process.env.NODE_ENV === 'development' ? (): Promise<void> => Promise.resolve() : undefined,
    // altchaRef: process.env.NODE_ENV === 'development' ? undefined : altchaRef,
  })

  // const [SubmitButtonTwin, setSubmitButtonTwin] = useState<React.ReactPortal | null>(null)
  // useEffect(() => {
  //   const emailFormElem = document.getElementsByClassName(classes.giveawayEmailForm)[0] as HTMLFormElement
  //   if (!emailFormElem) return

  //   setSubmitButtonTwin(() => {
  //     if (!emailFormElem) return null
  //     return createPortal(
  //       <div className={classes.buttonTwinWrap}>
  //         <Button
  //           onClick={() => {
  //             const realBtn = document.getElementsByClassName(classes.giveawayEmailFormButton)[0] as HTMLButtonElement
  //             if (!realBtn) return
  //             realBtn.click()
  //           }}
  //         >
  //           Отправить
  //         </Button>
  //       </div>,
  //       emailFormElem,
  //     )
  //   })
  // }, [state.currentStep])

  // send status on update
  // useEffect(() => {
  //   setTimeout(() => {
  //     const event = new CustomEvent('giveawayStatus', { detail: state.currentStep })
  //     window.dispatchEvent(event)
  //   }, 200) // on mount fix
  // }, [state])

  // USAGE
  // useEffect(() => {
  //   const onGiveawayStatus = (e: CustomEventInit<number>): void => {
  //     if (e.detail) setGiveawayState(e.detail)
  //   }
  //   window.addEventListener('giveawayStatus', onGiveawayStatus)
  //   return (): void => {
  //     window.removeEventListener('giveawayStatus', onGiveawayStatus)
  //   }
  // }, [])

  // useEffect(() => {
  //   const submitButton = document.getElementsByClassName(classes.giveawayEmailFormButton)[0]
  //   const shareButtons = document.getElementsByClassName(classes.giveawayShareFormLink)
  //   const onSubmitClick = (): void => analyticsEvent('clickSend')
  //   const onVkClick = (): void => analyticsEvent('clickVk')
  //   const onTgClick = (): void => analyticsEvent('clickTg')
  //   const onWaClick = (): void => analyticsEvent('clickWa')
  //   const onCpClick = (): void => analyticsEvent('clickCopy')

  //   if (submitButton) submitButton.addEventListener('click', onSubmitClick)
  //   if (shareButtons[0]) shareButtons[0].addEventListener('click', onVkClick)
  //   if (shareButtons[1]) shareButtons[1].addEventListener('click', onTgClick)
  //   if (shareButtons[2]) shareButtons[2].addEventListener('click', onWaClick)
  //   if (shareButtons[3]) shareButtons[3].addEventListener('click', onCpClick)
  //   return (): void => {
  //     if (submitButton) submitButton.removeEventListener('click', onSubmitClick)
  //     if (shareButtons[0]) shareButtons[0].removeEventListener('click', onVkClick)
  //     if (shareButtons[1]) shareButtons[1].removeEventListener('click', onTgClick)
  //     if (shareButtons[2]) shareButtons[2].removeEventListener('click', onWaClick)
  //     if (shareButtons[3]) shareButtons[3].removeEventListener('click', onCpClick)
  //   }
  // }, [])

  return !isDeadlined ? (
    // before deadline
    <>
      {process.env.NODE_ENV !== 'development' && (
        <SmartCaptcha ref={captchaRef} siteKey={process.env.MODERN__SMART_CAPTCHA__SITE_KEY || ''} />
      )}
      {/* {process.env.NODE_ENV !== 'development' && <Altcha ref={altchaRef} />} */}

      {state.currentStep < 2 ? (
        // not registered
        <div id="giveaway" className={classes.register}>
          <div className={classes.registerBody}>
            <div className={classes.title}>{giveawayTexts.registration.title}</div>
            <div className={classes.text}>{giveawayTexts.registration.text}</div>
          </div>

          <div className={classes.wrap}>
            <Registration
              currentStep={state.currentStep}
              emailFormData={{
                ...emailFormData,
                onSubmit: handleRegister,
                classes: {
                  className: classes.giveawayEmailForm,
                  stepClassName: classes.giveawayStep,
                  textClassName: classes.giveawayEmailFormText,
                  inputClassName: classes.giveawayEmailFormInput,
                  checkboxClassName: classes.giveawayEmailFormCheckbox,
                  buttonClassName: classes.giveawayEmailFormButton,
                },
              }}
              shareFormData={{
                ...shareFormData,
                onShare: handleShare,
                classes: {
                  className: classes.giveawayShareForm,
                  stepClassName: classes.giveawayStep,
                  titleClassName: classes.giveawayShareFormTitle,
                  textClassName: classes.giveawayShareFormText,
                  linkClassName: classes.giveawayShareFormLink,
                  linksContainerClassName: classes.giveawayShareFormLinkContainer,
                },
              }}
              // shouldSkipShareForm={shouldSkipShareForm}
              networkError={networkError}
            />
            {/* {SubmitButtonTwin} */}
          </div>
        </div>
      ) : (
        // registered
        <div id="giveaway" className={classes.registered}>
          <div className={classes.registeredBody}>
            <div className={classes.title}>{giveawayTexts.registered.subscribedTitle}</div>
            <div className={classes.text}>{giveawayTexts.registered.subscribedText}</div>
          </div>

          <SubscriptionsForm
            title=""
            text=""
            aviasalesInfo={
              {
                ...aviasalesInfo,
                title: '',
                bulletPoints: ['asd'],
                classes: {
                  className: classes.subscriptionsFormSub,
                  titleClassName: classes.subscriptionsFormTitle,
                  bulletPointsClassName: classes.subscriptionsFormBulletPoints,
                  buttonClassName: classes.subscriptionsFormButton,
                  subscribedButtonClassName: classes.subscriptionsFormButtonDone,
                },
              } as SubscriptionProps
            }
            partnerInfo={
              partnerInfo
                ? ({
                    ...partnerInfo,
                    classes: {
                      className: classes.subscriptionsFormSub,
                      titleClassName: classes.subscriptionsFormTitle,
                      bulletPointsClassName: classes.subscriptionsFormBulletPoints,
                      buttonClassName: classes.subscriptionsFormButton,
                      subscribedButtonClassName: classes.subscriptionsFormButtonDone,
                    },
                  } as SubscriptionProps)
                : undefined
            }
            classes={{
              className: classes.subscriptionsForm,
              subscriptionsClassName: classes.subscriptionsFormSubs,
            }}
          />
        </div>
      )}
    </>
  ) : (
    // after deadline
    <>
      {!winnersList.length ? (
        // no winners yet
        <div id="giveaway" className={classes.registered}>
          <div className={classes.title}>{giveawayTexts.over.giveawayOverTitle}</div>
          <div className={classes.text}>{giveawayTexts.over.giveawayOverText}</div>
        </div>
      ) : (
        // there are winners
        <div id="giveaway" className={classes.winners}>
          <div className={classes.title}>{giveawayTexts.winners.title}</div>
          <div className={classes.winnersCard}>
            <div className={classes.winnersTitle}>{giveawayTexts.winners.winnersTitle}</div>
            <div className={classes.winnersList}>
              {winnersList.map((winner: string) => (
                <div key={winner} className={classes.winner}>
                  {winner}
                </div>
              ))}
            </div>
            {winnersLink && (
              <div className={classes.winnersActions}>
                <a href={winnersLink} target="_blank">
                  {giveawayTexts.winners.winnersLinkText}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
