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
    title: <>Осталось выиграть билеты</>,
    text: <>Мы&nbsp;как раз разыгрываем два путешествия до&nbsp;70&nbsp;000&nbsp;₽</>,
  },

  registered: {
    subscribedTitle: <>Поздравляем, вы&nbsp;участвуете в&nbsp;розыгрыше!</>,
    subscribedText: (
      <>
        Результаты опубликуем до&nbsp;NN.NN.NN в&nbsp;нашем{' '}
        <a href={links.vk} target="_blank">
          сообществе в&nbsp;VK
        </a>
        , а&nbsp;победителям напишем на&nbsp;почту
      </>
    ),
  },

  over: {
    giveawayOverTitle: <>Розыгрыш путешествий кончился</>,
    giveawayOverText: <>Подпишитесь на&nbsp;рассылки, чтобы не&nbsp;пропустить другие розыгрыши.</>,
  },

  winners: {
    title: <>А&nbsp;розыгрыш закончился</>,
    winnersTitle: 'Как выбирали победителя',
    winnersLinkText: 'Как выбирали победителя',
  },
}

export const emailFormData: Omit<EmailFormProps, 'onSubmit'> = {
  title: 'Оставьте почту',
  text: 'Чтобы мы поздравили лично',
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
      Соглашаюсь c&nbsp;
      <a href={links.privacy} target="_blank">
        обработкой пользовательских данных
      </a>
    </>,
  ],
}

export const shareFormData: Omit<ShareFormProps, 'onShare'> = {
  title: 'Поделитесь с друзьями',
  text: 'Вдруг сможете полететь вместе',
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
