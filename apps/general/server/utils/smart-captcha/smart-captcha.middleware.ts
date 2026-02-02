import { logger } from '@kosyanmedia/devcom-logger-node'
import { MiddlewareHandler } from '@modern-js/server-runtime'

import { smartCaptchaConfig } from './smart-captcha.config'

interface SmartCaptchaResponse {
  status: string
  message?: string
}

/**
 * Verify Smart Captcha token with Yandex API
 */
async function verifySmartCaptcha(token: string, serverKey: string, userIp?: string): Promise<boolean> {
  const { validationUrl } = smartCaptchaConfig

  const formData = new URLSearchParams({
    secret: serverKey,
    token: token,
    ...(userIp && { ip: userIp }),
  })

  try {
    const response = await fetch(validationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })

    const result = (await response.json()) as SmartCaptchaResponse
    return result.status === 'ok'
  } catch (error) {
    logger.error('Smart Captcha validation request failed: %o', error)
    return true
  }
}

/**
 * Middleware to validate Smart Captcha token in requests.
 */
export const smartCaptchaMiddleware: MiddlewareHandler = async (c, next): Promise<Response | void> => {
  const { headerName, isProd, serverKey, skip } = smartCaptchaConfig
  logger.log('Smart Captcha Middleware config: %o', { skip })

  if (!c.req.path.startsWith('/api') || !isProd || skip) {
    logger.warn('Skipping Smart Captcha validation for path %s.', c.req.path)
    return next()
  }

  const token = c.req.header(headerName)
  if (!serverKey || !token || typeof token !== 'string') {
    logger.error('Smart Captcha validation failed: missing token or server key.')
    return c.json({ code: -1, message: 'Smart Captcha validation failed.' }, 403)
  }

  const userIp: string | undefined =
    c.req.header('x-forwarded-for') ||
    c.req.header('x-real-ip') ||
    c.req.header('remote-addr') ||
    ((c.env as Record<string, unknown>)?.ip as string | undefined) ||
    undefined

  try {
    const valid = await verifySmartCaptcha(token, serverKey, userIp)
    if (!valid) {
      logger.error('Smart Captcha validation failed: invalid token.')
      return c.json({ code: -1, message: 'Smart Captcha validation failed.' }, 403)
    }
  } catch (e) {
    logger.error('Smart Captcha verification error %o.', e)
    return c.json({ code: -1, message: 'Smart Captcha verification error.' }, 403)
  }

  await next()
}
