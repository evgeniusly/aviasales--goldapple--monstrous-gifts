type AssetStatus = 'pending' | 'resolved' | 'rejected' | 'aborted' | 'is_data'
interface AssetStatuses {
  [key: string]: AssetStatus
}
type AssetPreloader = (asset: string[], progressSender?: (progress: number) => void) => Promise<void>

const assetPreloader: AssetPreloader = async (asset, progressSender) => {
  // remove duplicates
  asset = [...new Set(asset)]

  const statuses: AssetStatuses = Object.fromEntries(asset.map((key) => [key, 'pending']))
  const sendProgress = (): void => {
    progressSender?.(Object.values(statuses).filter((status) => status !== 'pending').length / asset.length)
  }

  await Promise.allSettled(
    asset.map((href) => {
      if (!href || href.startsWith('data:')) {
        statuses[href] = 'is_data'
        sendProgress()
        return Promise.resolve()
      }

      return new Promise<void>((resolve, reject) => {
        const onReady = (status: AssetStatus): void => {
          statuses[href] = status
          sendProgress()
          ;(status === 'resolved' ? resolve : reject)()
        }

        let as = 'image' // 'image' as default
        if (/\.(gif|jpe?g|tiff?|png|webp|bmp|svg)(?:\?(?:[^.])*)*$/i.test(href)) as = 'image'
        if (/\.(eot|woff2|woff|ttf|otf)(?:\?(?:[^.])*)*$/i.test(href)) as = 'font'
        if (/\.(mp4|mov)(?:\?(?:[^.])*)*$/i.test(href)) as = 'fetch'

        const link = document.createElement('link')
        link.onload = (): void => onReady('resolved')
        link.onerror = (): void => onReady('rejected')
        link.onabort = (): void => onReady('rejected')
        link.rel = 'preload'
        link.href = href
        if (as) link.as = as
        if (as === 'font') link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      })
    }),
  )
}
export default assetPreloader
