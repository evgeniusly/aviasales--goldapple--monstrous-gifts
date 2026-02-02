export const getPath = (path: string = ''): string => {
  const host = process.env.MODERN__SITE_URL || 'http://localhost:8080'
  path = path.startsWith('/') ? path : `/${path}`
  return host + path
}
