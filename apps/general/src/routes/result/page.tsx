import { useEffect, useState } from 'react'

import { Helmet } from '@modern-js/runtime/head'

import { get as getSubscriptions } from '~api/subscriptions'

const Index = (): JSX.Element => {
  const [data, setData] = useState({})

  useEffect(() => {
    getSubscriptions({ query: { email: 'test@test.test' } }).then((response) => setData(response || {}))
  }, [])

  return (
    <div>
      <Helmet>
        <title>Результат</title>
      </Helmet>
      <p>Пример интеграции лямбды: {JSON.stringify(data)}</p>
    </div>
  )
}

export default Index
