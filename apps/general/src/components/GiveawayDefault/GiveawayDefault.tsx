import React, { useRef } from 'react'

import giveawayPerson from '@assets/images/giveawayPerson.png'
import { Registration, useGiveaway } from '@kosyanmedia/devcom-spec-uikit/dist/collections'
import { SmartCaptcha } from '@kosyanmedia/devcom-spec-uikit/dist/elements'

import { emailFormData, giveawayTexts, shareFormData, subscriptionFormData } from '~/data'
import { winnersLink, winnersList } from '~/defs'
import { useAppStore } from '~/store/appStore'

import classes from './GiveawayDefault.module.scss'

export const GiveawayDefault: React.FC = () => {
  const isDeadlined = useAppStore((state) => state.isDeadlined)

  const captchaRef = useRef<{ value: string | null }>(null)

  const { state, networkError, handleRegister, handleShare } = useGiveaway({
    isDevelopment: process.env.NODE_ENV === 'development',
    captchaRef: captchaRef,
    subscriptionFormData: subscriptionFormData,
  })

  // useEffect(() => {
  //   const submitButton = document.getElementsByClassName(classes.giveawayEmailFormButton)[0]
  //   const shareButtons = document.getElementsByClassName(classes.giveawayShareFormLink)
  //   const checkboxes = document.getElementsByClassName(classes.giveawayEmailFormCheckbox)
  //   const onSubmitClick = (): void => analyticsEvent('clickSend')
  //   const onVkClick = (): void => analyticsEvent('clickVk')
  //   const onTgClick = (): void => analyticsEvent('clickTg')
  //   const onWaClick = (): void => analyticsEvent('clickWa')
  //   const onCpClick = (): void => analyticsEvent('clickCopy')
  //   const onChkBox1Click = (): void => analyticsEvent('buttonAgree1')
  //   const onChkBox2Click = (): void => analyticsEvent('buttonAgree2')

  //   if (submitButton) submitButton.addEventListener('click', onSubmitClick)
  //   if (shareButtons[0]) shareButtons[0].addEventListener('click', onVkClick)
  //   if (shareButtons[1]) shareButtons[1].addEventListener('click', onTgClick)
  //   if (shareButtons[2]) shareButtons[2].addEventListener('click', onWaClick)
  //   if (shareButtons[3]) shareButtons[3].addEventListener('click', onCpClick)
  //   if (checkboxes[0]) checkboxes[0].addEventListener('click', onChkBox1Click, { once: true })
  //   if (checkboxes[1]) checkboxes[1].addEventListener('click', onChkBox2Click, { once: true })
  //   return (): void => {
  //     if (submitButton) submitButton.removeEventListener('click', onSubmitClick)
  //     if (shareButtons[0]) shareButtons[0].removeEventListener('click', onVkClick)
  //     if (shareButtons[1]) shareButtons[1].removeEventListener('click', onTgClick)
  //     if (shareButtons[2]) shareButtons[2].removeEventListener('click', onWaClick)
  //     if (shareButtons[3]) shareButtons[3].removeEventListener('click', onCpClick)
  //     if (checkboxes[0]) checkboxes[0].removeEventListener('click', onChkBox1Click)
  //     if (checkboxes[1]) checkboxes[1].removeEventListener('click', onChkBox2Click)
  //   }
  // }, [])

  return !isDeadlined ? (
    // before deadline
    <>
      {process.env.NODE_ENV !== 'development' && (
        <SmartCaptcha ref={captchaRef} siteKey={process.env.MODERN__SMART_CAPTCHA__SITE_KEY || ''} />
      )}

      {state.currentStep < 2 ? (
        // not registered
        <div id="giveaway" className={classes.register}>
          <div className={classes.registerBody}>
            <div className={classes.title}>{giveawayTexts.registration.title}</div>
            <div className={classes.text}>{giveawayTexts.registration.text}</div>
            <img className={classes.giveawayPerson} src={giveawayPerson} alt="" draggable="false" />
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
            <img className={classes.giveawayPerson} src={giveawayPerson} alt="" draggable="false" />
          </div>
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
          <img className={classes.giveawayPerson} src={giveawayPerson} alt="" draggable="false" />
        </div>
      ) : (
        // there are winners
        <div id="giveaway" className={classes.registered}>
          <div className={classes.title}>{giveawayTexts.winners.title}</div>
          <div className={classes.winnersCard}>
            <div className={classes.winnersTitle}>
              Авиабилеты{' '}
              {winnersLink ? (
                <a href={winnersLink} target="_blank">
                  получат
                </a>
              ) : (
                'получат'
              )}
            </div>
            <div className={classes.winnersList}>
              {winnersList.map((winner: string) => (
                <div key={winner} className={classes.winner}>
                  {winner}
                </div>
              ))}
            </div>
          </div>
          <img className={classes.giveawayPerson} src={giveawayPerson} alt="" draggable="false" />
        </div>
      )}
    </>
  )
}
