interface IResultData {
  title: React.JSX.Element
  text: React.JSX.Element
  restartBtnText: string
}

const restartBtnText = 'Ещё раз'
export const results: ({ min: number } & IResultData)[] = [
  {
    min: 4,
    title: <></>,
    text: <></>,
    restartBtnText,
  },
  {
    min: 2,
    title: <></>,
    text: <></>,
    restartBtnText,
  },
  {
    min: 0,
    title: <></>,
    text: <></>,
    restartBtnText,
  },
]

export const resultEmpty: IResultData = {
  title: <>Тест не пройден</>,
  text: <>И как так-то?</>,
  restartBtnText: 'Пройти тест',
}
