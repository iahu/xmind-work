import add from 'lodash/add'
import subtract from 'lodash/subtract'

export const padStart = n => n.toString().padStart(2, '0')

export const timeFormater = ts => {
  const d = new Date(+ts)
  return [
    [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(padStart).join('-'),
    [d.getHours(), d.getMinutes(), d.getSeconds()].map(padStart).join(':')
  ].join(' ')
}

const monthCalculatedBy = express => (month, n) => {
  const d = new Date(month)
  const m = d.getMonth()

  d.setMonth(express(m, n))
  return [d.getFullYear(), padStart(d.getMonth() + 1)].join('-')
}

export const monthAdd = monthCalculatedBy(add)

export const monthSubtract = monthCalculatedBy(subtract)

export const getYearMonth = ts => {
  const date = new Date(ts)
  return [date.getFullYear(), padStart(date.getMonth() + 1)].join('-')
}

export const currencyFormter = n =>
  (+n).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

const typeMarkerMap = ['-', '+']
export const typeMarker = type => typeMarkerMap[type]

export const typeNameMap = ['支出', '收入']
export const getTypeNameById = id => typeNameMap[id]

export const noop = () => {}
