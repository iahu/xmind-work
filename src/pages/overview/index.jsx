import './index.css'

import { Link } from 'react-router-dom'
import { groupBy } from 'lodash'
import React, { useMemo, useState } from 'react'

import { currencyFormter, monthAdd, monthSubtract } from 'helper'
import { getBillByMonth, useBanalce, useBill } from 'pages/ledger/state'
import Header from 'components/header'
import Icon from 'components/icon'
import Page from 'components/page'

import MonthView from './month-view'
import Tab, { TabItem } from './tab'

const OverView = props => {
  const { month } = props.match.params
  const [active, setActive] = useState('支出')
  const [bill] = useBill()
  const billOfMonth = getBillByMonth(month, bill)
  const [income, expenditure] = useBanalce(billOfMonth)
  const { '0': expenditureBill, '1': incomeBill } = groupBy(billOfMonth, 'type')
  const tabData = [
    { name: '支出', value: expenditure },
    { name: '收入', value: income }
  ]
  const prevMonth = useMemo(() => monthSubtract(month, 1), [month])
  const nextMonth = useMemo(() => monthAdd(month, 1), [month])

  return (
    <Page className="overview">
      <Header
        left={
          <Link to="/">
            <Icon icon="icon-jiantouzuo" />
          </Link>
        }
      >
        统计
      </Header>
      <div className="header">
        <Link
          className="nav-btn"
          title="上一个月"
          to={`/overview/${prevMonth}`}
        >
          <Icon icon="icon-jiantouzuo" />
        </Link>
        <h3 className="month">{month}</h3>
        <Link
          className="nav-btn"
          title="下一个月"
          to={`/overview/${nextMonth}`}
        >
          <Icon icon="icon-jiantou" />
        </Link>
      </div>

      <Tab>
        {tabData.map(t => (
          <TabItem
            name={t.name}
            value={`￥${currencyFormter(t.value)}`}
            id={t.name}
            key={t.name}
            onClick={setActive}
            active={t.name === active}
          />
        ))}
      </Tab>

      {bill && active === '支出' && (
        <MonthView typeName="支出" sum={expenditure} bill={expenditureBill} />
      )}
      {bill && active === '收入' && (
        <MonthView typeName="收入" sum={income} bill={incomeBill} />
      )}
    </Page>
  )
}

export default OverView
