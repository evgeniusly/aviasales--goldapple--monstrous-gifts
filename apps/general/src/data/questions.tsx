import res01 from '@assets/images/res01.png'
import res02 from '@assets/images/res02.png'
import res03 from '@assets/images/res03.png'
import res04 from '@assets/images/res04.png'
import res05 from '@assets/images/res05.png'
import res06 from '@assets/images/res06.png'
import res07 from '@assets/images/res07.png'
import res08 from '@assets/images/res08.png'
import res09 from '@assets/images/res09.png'
import res10 from '@assets/images/res10.png'
import res11 from '@assets/images/res11.png'
import res12 from '@assets/images/res12.png'

export const answerLimit = 3

export const questions = [
  {
    option: <>Обожает свою работу</>,
    result: {
      number: '1',
      image: res01,
      title: <>Номер вашей карты</>,
      forWho: <>обожателю своей работы</>,
      text: <>Дайте человеку понять, в&nbsp;каком формате с&nbsp;вами лучше делиться радостью от&nbsp;работы</>,
      promo: (
        <>
          Если он&nbsp;уже в&nbsp;курсе, дарите{' '}
          <a href="https://goldapple.ru/19000209010-orange-oakmoss" target="_blank">
            аромат Orange &amp;&nbsp;Oakmoss
          </a>{' '}
          от&nbsp;Po&egrave;mes de&nbsp;Provence&nbsp;&mdash; с&nbsp;ним ваш трудоголик точно не&nbsp;забудет взять
          отпуск
        </>
      ),
    },
  },

  {
    option: <>Кофе как часть личности</>,
    result: {
      number: '2',
      image: res02,
      title: <>Воронка и&nbsp;фильтр</>,
      forWho: <>кофейной личности</>,
      text: <>Не&nbsp;оставят равнодушным ни&nbsp;одного кофейного модника</>,
      promo: (
        <>
          Боитесь прогадать с&nbsp;посудой? Подарите{' '}
          <a href="https://goldapple.ru/19000344226-aqua-gel-hyaluron-complex" target="_blank">
            тинт от&nbsp;Luxvisage
          </a>
          &nbsp;&mdash; он&nbsp;останется на&nbsp;губах даже после десяти чашек кофе
        </>
      ),
    },
  },

  {
    option: <>Спорит со&nbsp;всеми в&nbsp;интернете</>,
    result: {
      number: '3',
      image: res03,
      title: <>Охлаждающий элемент</>,
      forWho: <>спорщику в&nbsp;интернетах</>,
      text: <>Снизит градус слишком жарких дебатов и&nbsp;убережёт мебель под вашим спорщиком</>,
      promo: (
        <>
          Если уберечь спорщика не&nbsp;получится, помогите ему восстановиться, например, с&nbsp;
          <a href="https://goldapple.ru/19000434167-chaga-peptides" target="_blank">
            маской Chaga Peptides от&nbsp;Natura Siberica
          </a>
        </>
      ),
    },
  },

  {
    option: <>Хочет больше путешествовать</>,
    result: {
      number: '4',
      image: res04,
      title: <>Машинка для закатывания губы</>,
      forWho: <>желающему больше путешествовать</>,
      text: <>Позаботьтесь о&nbsp;здоровье тех, кому снова придётся смотреть его сториз из&nbsp;отпуска!</>,
      promo: (
        <>
          Ещё порадовать путешественника можно{' '}
          <a href="https://goldapple.ru/19000132094-be-you-orange" target="_blank">
            тревел-сетом от&nbsp;Curaprox
          </a>
          . Внутри радостного кейса&nbsp;&mdash; паста, щётка и&nbsp;ёршик
        </>
      ),
    },
  },

  {
    option: <>В&nbsp;стрессе</>,
    result: {
      number: '5',
      image: res05,
      title: <>Ноготь, который можно грызть</>,
      forWho: <>стрессующему</>,
      text: <>Пригодится тем, кому своих двадцати уже не&nbsp;хватает</>,
      promo: (
        <>
          Если это слишком экстравагантно, помогите стрессующему иначе&nbsp;&mdash; подарите ему, например,{' '}
          <a href="https://goldapple.ru/19000428813-collagen" target="_blank">
            восстанавливающую маску от&nbsp;Ollin Professional
          </a>
        </>
      ),
    },
  },

  {
    option: <>Печатает одним пальцем</>,
    result: {
      number: '6',
      image: res06,
      title: <>Напальчник-ладошка</>,
      forWho: <>печатающему одним пальцем</>,
      text: <>Чтобы отвечать на&nbsp;ваши сообщения можно было&nbsp;бы в&nbsp;пять раз быстрее</>,
      promo: (
        <>
          А&nbsp;хорошим подарком может стать{' '}
          <a href="https://goldapple.ru/99000065158-model-s-sensor-rmb-707s" target="_blank">
            фен-стайлер от&nbsp;Remez
          </a>
          &nbsp;&mdash; управлять им&nbsp;действительно можно одним прикосновением
        </>
      ),
    },
  },

  {
    option: <>Вечно сидит дома</>,
    result: {
      number: '7',
      image: res07,
      title: <>Табуретка с&nbsp;двумя ножками</>,
      forWho: <>вечному домоседу</>,
      text: <>Ваш домосед сможет меньше сидеть и&nbsp;будет чаще выбираться куда-нибудь с&nbsp;вами</>,
      promo: (
        <>
          Лучше подарите своему домоседу{' '}
          <a href="https://goldapple.ru/19000237003-keratin-injection-20in1" target="_blank">
            профессиональный уход от&nbsp;ICE Professional
          </a>
          , чтобы ему не&nbsp;пришлось лишний раз вылезать из&nbsp;дома в&nbsp;салон
        </>
      ),
    },
  },

  {
    option: <>Маниакально рукодельничает</>,
    result: {
      number: '8',
      image: res08,
      title: <>Вышитая вышивка</>,
      forWho: <>рукодельнику</>,
      text: <>Порадуйте вашего рукодельника, сняв с&nbsp;его плеч самую сложную работу</>,
      promo: (
        <>
          Если вышитую вышивку вы&nbsp;уже дарили в&nbsp;прошлом году, присмотритесь к&nbsp;
          <a href="https://goldapple.ru/19000406752-texture" target="_blank">
            крему-тонику для укладки от&nbsp;Reuzel
          </a>
        </>
      ),
    },
  },

  {
    option: <>Очень солидный человек</>,
    result: {
      number: '9',
      image: res09,
      title: <>Костюм деловой колбасы</>,
      forWho: <>очень солидному человеку</>,
      text: <>Галстуком вы&nbsp;никого не&nbsp;удивите. А&nbsp;вот костюм колбасы произведёт нужное впечатление</>,
      promo: (
        <>
          Если боитесь прогадать с&nbsp;солидностью, дайте получателю выбрать подарок самостоятельно, например, с&nbsp;
          <a href="https://goldapple.ru/19000439419-gift-card" target="_blank">
            подарочной картой &laquo;Золотого Яблока&raquo;
          </a>
        </>
      ),
    },
  },

  {
    option: <>Модник-походник </>,
    result: {
      number: '10',
      image: res10,
      title: <>Обвес из&nbsp;шишек и&nbsp;желудей</>,
      forWho: <>моднику-походнику</>,
      text: (
        <>
          Не&nbsp;поделка, а&nbsp;крафт. Хорошо сочетается с&nbsp;курткой из&nbsp;мембраны и&nbsp;сами знаете какими
          кроссовками
        </>
      ),
      promo: (
        <>
          Напомнить моднику-походнику о&nbsp;горах и&nbsp;лесах поможет{' '}
          <a href="https://goldapple.ru/25380100012-daily-shampoo" target="_blank">
            ежедневный шампунь Reuzel
          </a>{' '}
          с&nbsp;запахом мяты и&nbsp;тонизирующими травами
        </>
      ),
    },
  },

  {
    option: <>Планирует вообще всё</>,
    result: {
      number: '11',
      image: res11,
      title: <>Успокаивающий плакат</>,
      forWho: <>планирующему всё-всё</>,
      text: <>Если увидите слёзы на&nbsp;глазах принимающего подарок, знайте: это от&nbsp;счастья</>,
      promo: (
        <>
          Всё контролировать, может, и&nbsp;нельзя, но&nbsp;вот объёмную укладку&nbsp;&mdash; запросто. На&nbsp;помощь
          придёт{' '}
          <a href="https://goldapple.ru/37730500002-superstar-qu" target="_blank">
            спрей от&nbsp;Tigi Bed Head
          </a>
        </>
      ),
    },
  },

  {
    option: <>Постоянно смотрит кино</>,
    result: {
      number: '12',
      image: res12,
      title: <>Антиспойлер-система</>,
      forWho: <>любителю кино</>,
      text: <>Чтобы ваш киноман мог контролировать себя или других одним движением руки</>,
      promo: (
        <>
          По-настоящему пригодиться на&nbsp;киномарафоне может{' '}
          <a href="https://goldapple.ru/19000480724-lash-adept" target="_blank">
            термотушь Shikstudio
          </a>
          , устойчивая к&nbsp;осыпанию
        </>
      ),
    },
  },
]
