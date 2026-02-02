import type { MiddlewareHandler } from '@modern-js/server-runtime'

export const cacheStaticMiddleware: MiddlewareHandler = async (c, next): Promise<void> => {
  const { pathname } = new URL(c.req.url)

  if (pathname.startsWith('/static/')) {
    c.header('Cache-Control', 'public, max-age=31536000, immutable')
  }

  await next()
}
