import { Helmet } from '@modern-js/runtime/head'

const Index = (): JSX.Element => (
  <div>
    <Helmet>
      <title>Страница</title>
    </Helmet>
    <p>Содержимое страницы</p>
  </div>
)

export default Index
