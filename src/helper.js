const padStart = n => ('0' + n).substr(-2, 2)

export const timeFormater = ts => {
  const d = new Date(+ts)
  return [
    [d.getFullYear(), padStart(d.getMonth() + 1), padStart(d.getDate())].join(
      '-'
    ),
    [d.getHours(), d.getMinutes(), d.getSeconds()].map(padStart).join(':')
  ].join(' ')
}

export const monthAdd = (month, n) => {
  const [yy, mm] = month.split('-')
  const o = +mm + n
  const y = +yy + ~~(o / 13)
  const m = o % 13 || 1
  return [y, padStart(m)].join('-')
}

export const monthSubtract = (month, n) => {
  const [yy, mm] = month.split('-')
  const o = +mm - n
  const m = (o + 12) % 12 || 12
  const y = +yy - ~~(m / 12)
  return [y, padStart(m)].join('-')
}

export const currencyFormter = n =>
  // (+(+n).toFixed(2)).toLocaleString('en-IN')
  (+n).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

const typeMarkerMap = ['-', '+']
export const typeMarker = type => typeMarkerMap[type]

export const typeNameMap = ['支出', '收入']
export const getTypeNameById = id => typeNameMap[id]

export const getYearMonth = ts => {
  const date = new Date(ts)
  return [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, '0')
  ].join('-')
}

export const noop = () => {}
