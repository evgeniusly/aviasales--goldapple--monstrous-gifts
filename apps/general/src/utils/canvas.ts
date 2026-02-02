import { clamp } from './helpers'

export const clearCtx = (ctx: CanvasRenderingContext2D, x = 0, y = 0, w?: number, h?: number): void => {
  w = w ?? ctx.canvas.width
  h = h ?? ctx.canvas.width
  ctx.clearRect(x, y, w, h)
}

export const drawImageProp = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x = 0,
  y = 0,
  w?: number,
  h?: number,
  offsetX = 0.5,
  offsetY = 0.5,
): void => {
  w = w ?? ctx.canvas.width
  h = h ?? ctx.canvas.height
  offsetX = clamp(offsetX, 0, 1)
  offsetY = clamp(offsetY, 0, 1)

  const iw = img.naturalWidth
  const ih = img.naturalHeight
  const r = Math.min(w / iw, h / ih)
  let nw = iw * r
  let nh = ih * r
  let cx
  let cy
  let cw
  let ch
  let ar = 1

  if (nw < w) ar = w / nw
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh
  nw *= ar
  nh *= ar

  cw = iw / (nw / w)
  ch = ih / (nh / h)
  cx = (iw - cw) * offsetX
  cy = (ih - ch) * offsetY
  if (cx < 0) cx = 0
  if (cy < 0) cy = 0
  if (cw > iw) cw = iw
  if (ch > ih) ch = ih

  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h)
}

export const downloadCanvas = (canvas: HTMLCanvasElement, filename = 'image.png'): void => {
  // const image = canvasRef.current.toDataURL('image/png').replace('image/png', 'image/octet-stream') // here is the most important part because if you dont replace you will get a DOM 18 exception.
  // window.location.href = image
  const a = document.createElement('a')
  a.href = canvas.toDataURL('image/png')
  a.download = filename
  a.click()
}
