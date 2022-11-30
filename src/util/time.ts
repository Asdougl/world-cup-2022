export const seconds = (n: number) => n * 1000
export const minutes = (n: number) => seconds(n) * 60
export const hours = (n: number) => minutes(n) * 60
export const days = (n: number) => hours(n) * 24
export const weeks = (n: number) => days(n) * 7
export const months = (n: number) => days(n) * 30
export const years = (n: number) => days(n) * 365

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const WEEK = DAY * 7
const MONTH = DAY * 28
const YEAR = DAY * 365

const roundTowardZero = (n: number) => {
  return n > 0 ? Math.floor(n) : Math.ceil(n)
}

export const timeSince = (date: Date) => {
  const parser = new Intl.RelativeTimeFormat('en')

  const diff = date.getTime() - Date.now()
  const absDiff = Math.abs(diff)

  let unit: Intl.RelativeTimeFormatUnit, value: number
  if (absDiff >= YEAR) {
    unit = 'years'
    value = roundTowardZero(diff / YEAR)
  } else if (absDiff >= MONTH) {
    unit = 'months'
    value = roundTowardZero(diff / MONTH)
  } else if (absDiff >= WEEK) {
    unit = 'weeks'
    value = roundTowardZero(diff / WEEK)
  } else if (absDiff >= DAY) {
    unit = 'days'
    value = roundTowardZero(diff / DAY)
  } else if (absDiff >= HOUR) {
    unit = 'hours'
    value = roundTowardZero(diff / HOUR)
  } else if (absDiff >= MINUTE) {
    unit = 'minutes'
    value = roundTowardZero(diff / MINUTE)
  } else {
    return 'Just now'
  }

  return parser.format(value, unit)
}
