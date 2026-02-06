import { SharingType } from '@kosyanmedia/devcom-spec-uikit/dist/collections'
import { GiveawayProps } from '@kosyanmedia/devcom-spec-uikit/dist/collections/Common/Giveaway/Giveaway.types'
import { EmailFormProps, ShareFormProps, SubscriptionsFormProps } from '@kosyanmedia/devcom-spec-uikit/dist/modules'
import { SubscriptionProps } from '@kosyanmedia/devcom-spec-uikit/dist/modules/SubscriptionsForm/Subscription'

import { links } from './links'

export const giveawayTexts: {
  registration: {
    title: React.ReactNode
    text: React.ReactNode
  }
  registered: Pick<GiveawayProps, 'subscribedTitle' | 'subscribedText'>
  over: Pick<GiveawayProps, 'giveawayOverTitle' | 'giveawayOverText'>
  winners: Pick<GiveawayProps, 'winnersTitle' | 'winnersLinkText'> & { title: React.ReactNode }
} = {
  registration: {
    title: <>Дарим вам розыгрыш путешествия</>,
    text: <>Можно выиграть два авиабилета до&nbsp;40&nbsp;000&nbsp;₽ **</>,
  },

  registered: {
    subscribedTitle: <>Ура, вы&nbsp;участвуете в&nbsp;розыгрыше!</>,
    subscribedText: (
      <>Результаты опубликуем до&nbsp;NN.NN.NN на&nbsp;этой странице, а&nbsp;победителям напишем на&nbsp;почту.</>
    ),
  },

  over: {
    giveawayOverTitle: <>Уже выбираем победителей</>,
    giveawayOverText: <>Розыгрыш закончился, результаты опубликуем до&nbsp;NN.NN.NN на&nbsp;этой странице</>,
  },

  winners: {
    title: <>Путешествия уже разыграли</>,
    winnersTitle: 'Как выбирали победителя',
    winnersLinkText: 'Как выбирали победителя',
  },
}

export const emailFormData: Omit<EmailFormProps, 'onSubmit'> = {
  title: 'Оставьте почту',
  text: 'На неё напишем, если выиграете',
  emailErrorText: 'Похоже, в адрес почты закралась ошибка',
  userDataText: (
    <>
      Соглашаюсь{' '}
      <a href={links.rules} target="_blank">
        с&nbsp;правилами акции
      </a>
    </>
  ),
  checkboxes: [
    <>
      Соглашаюсь на&nbsp;
      <a href={links.privacy} target="_blank">
        обработку персональных данных
      </a>{' '}
      и&nbsp;получение информационных сообщений согласно политике обработки персональных данных
    </>,
  ],
}

export const shareFormData: Omit<ShareFormProps, 'onShare'> = {
  title: 'Поделитесь с друзьями',
  text: 'Чтобы и они могли выбрать вам подарок',
  linksInfo: [
    {
      [SharingType.Vk]: {
        link: `https://vk.com/share.php?url=https://i.avs.io/TODO`,
        // className: classes.linkVk
      },
    },
    {
      [SharingType.Telegram]: {
        link: `https://telegram.me/share/url?url=https://i.avs.io/TODO`,
        // className: classes.linkTg,
      },
    },
    {
      [SharingType.Whatsapp]: {
        link: `https://api.whatsapp.com/send?text=https://i.avs.io/TODO`,
        // className: classes.linkWa,
      },
    },
    {
      [SharingType.Link]: {
        link: window.location.origin,
        // link: 'https://i.avs.io/TODO',
        // className: classes.linkLn
      },
    },
  ],
}

export const subscriptionFormData: Omit<SubscriptionsFormProps, 'aviasalesInfo' | 'partnerInfo' | 'classes'> & {
  aviasalesInfo: Omit<SubscriptionProps, 'onButtonClick'>
  partnerInfo: Omit<SubscriptionProps, 'onButtonClick'>
} = {
  aviasalesInfo: {
    title: 'Авиасейлс',
    bulletPoints: ['Дешёвые авиабилеты', 'Письма с пользой', 'Статьи о путешествиях'],
  },
  partnerInfo: {
    title: 'TODO',
    bulletPoints: ['TODO_1', 'TODO_2', 'TODO_3'],
  },
}
