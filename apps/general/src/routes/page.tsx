import { FirstScreen } from '@kosyanmedia/devcom-spec-uikit/dist/collections'
import { Helmet } from '@modern-js/runtime/head'

const Index = (): JSX.Element => (
  <div>
    <Helmet>
      <title>Спецпроект</title>
    </Helmet>
    <FirstScreen
      introduction={{
        title: 'Спецпроект',
        text: 'Это описание спецпроекта',
        buttonText: 'Подробнее',
        onButtonClick: () => console.log('click'),
        logos: {
          partner: {
            link: '/',
            logo: '/',
          },
        },
      }}
    />
  </div>
)

export default Index
