export const questions = [
  {
    questionText: (
      <>
        В&nbsp;конце прошлого века в&nbsp;Карагандинском зоопарке жил слон Батыр, который обладал одной примечательной
        способностью&nbsp;&mdash; о&nbsp;ней даже писала британская Daily Telegraph! Что такого он&nbsp;умел?
      </>
    ),
    answers: [
      {
        value: 'speaking',
        isCorrect: true,
        children: 'Говорить',
        title: <>speaking title</>,
        information: (
          <>
            По&nbsp;свидетельствам работников зоопарка, лексикон слона состоял из&nbsp;слов: я, Батыр, воды, хороший,
            ой-ой-ой, дурак, плохой, иди на&nbsp;х**, баба, да, дай-дай-дай, раз-два-три. Несмотря на&nbsp;скромный
            тезаурус, Батыр стал любимчиком публики.
          </>
        ),
        promoText: (
          <>
            Если хотите так же приковывать внимание людей к своим речам — запишитесь на&nbsp;
            <a href="/">мастер-классы по ораторскому искусству от Синхронизации</a>.
          </>
        ),
      },
      {
        value: 'writing',
        isCorrect: false,
        children: 'Писать',
        title: <>writing title</>,
        information: (
          <>
            По&nbsp;свидетельствам работников зоопарка, лексикон слона состоял из&nbsp;слов: я, Батыр, воды, хороший,
            ой-ой-ой, дурак, плохой, иди на&nbsp;х**, баба, да, дай-дай-дай, раз-два-три. Несмотря на&nbsp;скромный
            тезаурус, Батыр стал любимчиком публики.
          </>
        ),
      },
    ],
    btnNext: 'Едем дальше',
  },

  {
    questionText: <>Второй вопрос... </>,
    answers: [
      {
        value: 'v1',
        isCorrect: false,
        children: '1',
        title: <>1 title</>,
        information: <>nope</>,
        promoText: <>promoText</>,
      },
      {
        value: 'v2',
        isCorrect: true,
        children: '2',
        title: <>2 title</>,
        information: <>yep</>,
        promoText: <>promoText</>,
      },
    ],
    btnNext: 'Поехали дальше',
  },
]
