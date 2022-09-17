import { differenceInYears, parseISO } from 'date-fns/esm/fp'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

export function calculateAge(dateString) {
  dayjs.extend(relativeTime)
  dayjs.locale('pt-br')
  const age = dayjs(dateString).fromNow(true)
  return age
}
