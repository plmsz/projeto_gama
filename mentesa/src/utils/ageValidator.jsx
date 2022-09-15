import { differenceInYears, parseISO } from 'date-fns/esm/fp'

export function calculateAge(dateString) {
  const date = parseISO(dateString, 'MM-dd-YYYY', new Date())
  const age = differenceInYears(date, new Date())
  return age
}
