export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const fetcher = (...args) => fetch(...args).then(res => res.json())

export const baseUrl = 'https://api.speedscribble.tech'
export const frontendBaseUrl = 'https://speedscribble.tech'
