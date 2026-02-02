export const smartCaptchaConfig = {
  serverKey: process.env.MODERN__SMART_CAPTCHA__SERVER_KEY,
  skip: process.env.MODERN__SMART_CAPTCHA__SKIP === 'true' || process.env.MODERN__SMART_CAPTCHA_SKIP === 'true',
  headerName: process.env.MODERN__SMART_CAPTCHA__HEADER_NAME || 'x-smart-captcha-token',
  isProd: process.env.NODE_ENV === 'production',
  validationUrl: 'https://smartcaptcha.yandexcloud.net/validate',
}
