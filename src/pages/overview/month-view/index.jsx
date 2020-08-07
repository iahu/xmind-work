import React, { useState } from 'react'
import groupBy from 'lodash/groupBy'
import keys from 'lodash/keys'
import sortBy from 'lodash/sortBy'
import values from 'lodash/values'

import { colors } from './config'
import { getColorByIndex, getSumOfBill } from './helper'
import Chart, { ChartBar } from '../chart'
import Empty from 'components/empty'
import RecordItem from 'pages/ledger/record-item'

const ForwardRecordItem = React.forwardRef(RecordItem)

const MonthView = props => {
  const { bill, sum, typeName } = props
  const [activeCategory, setActive] = useState('')
  const groupByCategory = groupBy(bill, 'category')
  const categoryKeys = keys(groupByCategory)
  const categoryGroups = values(groupByCategory)
  const sumByCategory = sortBy(categoryGroups.map(getSumOfBill)).reverse()
  const sortedBill = sortBy(bill, 'amount').reverse()
  const billOfCategory =
    activeCategory === ''
      ? sortedBill
      : sortedBill.filter(b => b.category === activeCategory)

  const handleClick = index => {
    if (index === activeCategory) setActive('')
    else setActive(index)
  }

  let offset = 0

  if (sum === 0 || !bill) return <Empty />

  return (
    <div className="month-view">
      <section className="block">
        <h4 className="section-hl">{typeName}总览</h4>
        <Chart data-active={activeCategory}>
          {categoryGroups.map((c, i) => {
            const value = sumByCategory[i]
            const prevOffset = offset / sum
            offset += value
            return (
              <ChartBar
                key={categoryKeys[i]}
                offset={prevOffset}
                index={categoryKeys[i]}
                name={c[0].categoryName}
                value={value}
                total={sum}
                color={getColorByIndex(i, colors)}
                onClick={handleClick}
                className={categoryKeys[i] === activeCategory ? 'active' : ''}
              />
            )
          })}
        </Chart>
      </section>

      <section className="block">
        <h4 className="section-hl">{typeName}排行榜</h4>
        <ul className="record-list">
          {billOfCategory.map(b => (
            <ForwardRecordItem data={b} key={b.id} />
          ))}
        </ul>
      </section>
    </div>
  )
}

export default MonthView
