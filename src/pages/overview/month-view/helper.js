import get from 'lodash/get'

export const getSumOfBill = bill =>
  get(
    bill.reduce((a, b) => ({ amount: a.amount + b.amount }), { amount: 0 }),
    'amount'
  )

export const getColorByIndex = (index, colors) => {
  const idx = index % colors.length
  return colors[idx]
}
