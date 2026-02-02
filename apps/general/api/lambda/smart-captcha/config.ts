import { logger } from '@kosyanmedia/devcom-logger-node'

interface SmartCaptchaConfig {
  sitekey: string
  invisible: boolean
}

export function get(): SmartCaptchaConfig | null {
  const siteKey = process.env.MODERN__SMART_CAPTCHA__SITE_KEY

  if (!siteKey) {
    logger.error('Missing Smart Captcha site key.')
    return null
  }

  return {
    sitekey: siteKey,
    invisible: true,
  }
}
