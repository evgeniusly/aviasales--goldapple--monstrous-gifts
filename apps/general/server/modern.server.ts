import { defineServerConfig } from '@modern-js/server-runtime'

import { cacheStaticMiddleware } from './middleware/cache-static.middleware'
import { smartCaptchaMiddleware } from './utils/smart-captcha'

export default defineServerConfig({
  middlewares: [
    { name: 'smart-captcha-validation', handler: smartCaptchaMiddleware, path: '/api/subscriptions/register' },
    { name: 'cache-static', handler: cacheStaticMiddleware, order: 'pre', path: '/static/*' },
  ],
})
