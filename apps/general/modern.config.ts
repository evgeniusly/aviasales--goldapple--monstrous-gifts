import { appTools, defineConfig } from '@modern-js/app-tools'
import { bffPlugin } from '@modern-js/plugin-bff'

export default defineConfig({
  runtime: { router: true },
  plugins: [appTools({ bundler: 'rspack' }), bffPlugin()],
  output: {
    cssModules: {
      auto: (resource) => {
        // Only process local .module.css files, exclude node_modules completely
        const isNodeModules = resource.includes('node_modules')
        return !isNodeModules
      },
    },
  },
  source: {
    globalVars: {
      'process.env.NODE_ENV': process.env.NODE_ENV === 'production' || process.env.DYNO ? 'production' : 'development',
      'process.env.MODERN__SITE_URL': process.env.MODERN__SITE_URL || 'http://localhost:8080',
      'process.env.MODERN__DEADLINE_DATE': process.env.MODERN__DEADLINE_DATE || '2027-01-01',
      'process.env.MODERN__ALTCRAFT__CAMPAIGN': process.env.MODERN__ALTCRAFT__CAMPAIGN || '',
      'process.env.MODERN__ALTCRAFT__USERNAME': process.env.MODERN__ALTCRAFT__USERNAME || '',
      'process.env.MODERN__ALTCRAFT__PASSWORD': process.env.MODERN__ALTCRAFT__PASSWORD || '',
      'process.env.MODERN__ALTCRAFT__URL': process.env.MODERN__ALTCRAFT__URL || 'https://altcraft-sender.avs.io',
      'process.env.MODERN__S3__ENDPOINT': process.env.MODERN__S3__ENDPOINT || 'http://localhost:9000',
      'process.env.MODERN__S3__ACCESS_KEY_ID': process.env.MODERN__S3__ACCESS_KEY_ID || '',
      'process.env.MODERN__S3__SECRET_ACCESS_KEY': process.env.MODERN__S3__SECRET_ACCESS_KEY || '',
      'process.env.MODERN__S3__BUCKET_NAME': process.env.MODERN__S3__BUCKET_NAME || 'spec-bucket',
      'process.env.MODERN__USE_SMART_CAPTCHA': process.env.MODERN__USE_SMART_CAPTCHA || 'true',
      'process.env.MODERN__SMART_CAPTCHA__SKIP': process.env.MODERN__SMART_CAPTCHA__SKIP || 'false',
      'process.env.MODERN__SMART_CAPTCHA__SITE_KEY': process.env.MODERN__SMART_CAPTCHA__SITE_KEY || '',
      'process.env.MODERN__SMART_CAPTCHA__SERVER_KEY': process.env.MODERN__SMART_CAPTCHA__SERVER_KEY || '',
      'process.env.MODERN__SMART_CAPTCHA__HEADER_NAME':
        process.env.MODERN__SMART_CAPTCHA__HEADER_NAME || 'x-smart-captcha-token',
      'process.env.MODERN__WINNERS': process.env.MODERN__WINNERS || '',
      'process.env.MODERN__WINNERS_LINK': process.env.MODERN__WINNERS_LINK || '',
    },
  },
  resolve: {
    alias: {
      '@assets': './src/assets',
      '@styles': './src/styles',
    },
  },
  tools: {
    sass: {
      additionalData: `@use '@styles/main' as *;\n`,
    },
  },
})
