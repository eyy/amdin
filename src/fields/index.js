import text from './text'
import textarea from './textarea'
import checkbox from './checkbox'
import array from './array'
import radio from './radio'
import number from './number'
import date from './date'
import ref from './ref'

export function matchField (path) {
  let field = path.field || path.type.toLowerCase()

  if (path.enum)
    return radio

  if (path.ref)
    return ref

  if ('boolean' === field)
    return checkbox

  if ('array' === field)
    return array

  if ('textarea' === field)
    return textarea

  if ('number' === field)
    return number

  if ('date' === field)
    return date

  return text
}