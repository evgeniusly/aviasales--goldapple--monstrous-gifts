// generators
export function randomIntTo(n: number): number {
  return Math.trunc(Math.random() * n)
}

export function randomIntFromTo(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomFloatFromTo(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export const getSoftRandomId = (max: number, lastInts: number[]): number => {
  let result = randomIntTo(max)
  while (lastInts.includes(result)) {
    result = randomIntTo(max)
  }
  lastInts.unshift(result)
  lastInts.length = Math.trunc(max / 2)
  return result
}

// arrays
export function randomFromArray<T>(items: T[]): T {
  return items[randomIntTo(items.length)]
}

export function shuffledArray<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = copy[i]
    copy[i] = copy[j]
    copy[j] = temp
  }
  return copy
}

export function idOfMax(array: number[]): number {
  let result = -1
  let maxVal = -Infinity
  array.forEach((value, id) => {
    if (value > maxVal) {
      maxVal = value
      result = id
    }
  })
  return result
}

// numders
export function clamp(val: number, min = 0, max = 1): number {
  return Math.min(Math.max(val, min), max)
}

// text
export function pluralize(count: number, one: string, two: string, five: string): string {
  count = Math.floor(Math.abs(count)) % 100
  if (count > 10 && count < 20) return five
  count = count % 10
  if (1 === count) return one
  if (count >= 2 && count <= 4) return two
  return five
}

// webkit
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
  } else {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'absolute'
    textArea.style.left = '-999999px'
    document.body.prepend(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
    } catch (error) {
      console.error(error)
    } finally {
      textArea.remove()
    }
  }
}

export function downloadURI(uri: string, name: string): void {
  const link = document.createElement('a')
  link.download = name
  link.href = uri
  link.click()
  link.remove()
}

export function scrollIntoViewById(id: string, arg?: ScrollIntoViewOptions): void {
  document.getElementById(id)?.scrollIntoView({ ...{ behavior: 'smooth', block: 'start' }, ...arg })
}

// async
export async function delay(ms: number): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export function debounce<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number,
): (...args: T) => Promise<U> {
  let timer: NodeJS.Timeout

  return (...args: T): Promise<U> => {
    clearTimeout(timer)
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), wait)
    })
  }
}
