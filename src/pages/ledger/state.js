import { useEffect, useMemo, useRef, useState } from 'react'
import csv from 'csvtojson'
import filter from 'lodash/filter'
import flowRight from 'lodash/flowRight'
import groupBy from 'lodash/groupBy'
import head from 'lodash/head'
import partial from 'lodash/partial'
import sortBy from 'lodash/sortBy'
import sortedUniqBy from 'lodash/sortedUniqBy'

import { getYearMonth } from 'helper'

/**
 * 获取账单数据
 * @return {Promise} 返回解析好的JSON数据
 */
const getBill = () =>
  fetch('/bill.csv')
    .then(t => t.text())
    .then(str =>
      csv({
        headers: ['type', 'time', 'category', 'amount']
      }).fromString(str)
    )

/**
 * 获取账单分类数据
 * @return {Promise} 返回解析好的JSON数据
 */
export const getCategories = () =>
  fetch('/categories.csv')
    .then(t => t.text())
    .then(str =>
      csv({
        headers: ['id', 'type', 'name']
      }).fromString(str)
    )

/**
 * 将两份数据合并计算
 * @return {Promise} 返回解计算好的数据
 */
export const mergeBill = ([bill, categories]) => {
  const cateGroupById = groupBy(categories, 'id')
  const _mapper = (b, i) => {
    const [{ name }] = cateGroupById[b.category] || []
    b.categoryName = name
    b.amount = Math.abs(+b.amount)
    b.month = getYearMonth(+b.time)
    b.id = i
    return b
  }
  return sortBy(bill.map(_mapper), 'time').reverse()
}

export const getComputedBill = () =>
  Promise.all([getBill(), getCategories()]).then(mergeBill)

/**
 * 经过合并计算过的账单数据
 */
export const useBill = () => {
  const [bill, setBill] = useState([])
  useEffect(() => {
    getComputedBill().then(setBill)
  }, [])

  return [bill, setBill]
}

/**
 * 分类数据
 */
export const useCategories = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  return [categories, setCategories]
}

/**
 * 首个要显示的月份
 */
export const useFirstMonth = bill =>
  useMemo(() => head(sortedUniqBy(bill, 'month').map(b => b.month)), [bill])

/**
 * 某个月的账单数据
 */
export const useBillOfMonth = (month, bill) =>
  useMemo(() => getBillByMonth(month, bill), [bill, month])

const safeFilter = (bill, guard, key) =>
  guard === '' ? bill : filter(bill, key)

export const getBillByMonth = (ym, bill) => {
  const _filter = b => b.month === ym
  return safeFilter(bill, ym, _filter)
}

/**
 * 收支总览
 */
export const useBanalce = bill => useMemo(() => getBalanceOfBill(bill), [bill])

export const getBalanceOfBill = bill => {
  const balance = [0, 0]
  bill.forEach(({ amount, type }) => {
    type === '0' ? (balance[1] += amount) : (balance[0] += amount)
  })
  return balance
}

/**
 * 模拟类型与分类进行过滤的账单数据
 */
export const useFiltedBill = (category, type, bill) =>
  useMemo(() => billFilter(category, type, bill), [category, type, bill])

export const getBillByType = (type, bill) => {
  const _filter = b => b.type === type
  return safeFilter(bill, type, _filter)
}

export const getBillByCategory = (category, bill) => {
  const _filter = b => b.category === category
  return safeFilter(bill, category, _filter)
}

export const billFilter = (category, type, bill) =>
  flowRight(
    partial(getBillByCategory, category),
    partial(getBillByType, type)
  )(bill)

export const useFiltedCategory = (type, categories) =>
  useMemo(
    () => (type === '' ? categories : categories.filter(c => c.type === type)),
    [type, categories]
  )

export const useListHeight = ready => {
  const listRef = useRef()
  const [listHeight, setListHeight] = useState(1000)

  useEffect(() => {
    if (listRef.current) {
      setListHeight(
        window.innerHeight - listRef.current.listRef.current.offsetTop
      )
    }
  }, [ready])

  return [listRef, listHeight]
}
