// Draw in a path line
// USAGE
// ref={(el) => lineDrawIn(el, { delay: 1000, invertDirection: true })}
export const lineDrawIn = (
  el: SVGPathElement | null,
  options?: {
    invertDirection?: boolean
    delay?: number
    duration?: number
    easing?: string
  },
): void => {
  if (!el) return
  const length = el.getTotalLength()
  el.style.strokeDasharray = `${length}`
  el.style.strokeDashoffset = `${length * (options?.invertDirection ? -1 : 1)}`
  el.animate([{ strokeDashoffset: 0 }], {
    delay: options?.delay ?? 0,
    duration: options?.duration ?? 1000,
    easing: options?.easing ?? 'ease-out',
    fill: 'forwards',
  })
}
