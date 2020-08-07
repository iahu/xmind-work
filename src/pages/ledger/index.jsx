import './index.css'

import { Link } from 'react-router-dom'
import List from 'rc-virtual-list'
import React, { useCallback, useMemo, useState } from 'react'

import { currencyFormter, typeNameMap } from 'helper'
import Empty from 'components/empty'
import Header from 'components/header'
import Icon from 'components/icon'
import Page, { PageContent } from 'components/page'

import {
  useBanalce,
  useBill,
  useBillOfMonth,
  useCategories,
  useFiltedBill,
  useFiltedCategory,
  useFirstMonth,
  useListHeight
} from './state'
import RecordItem from './record-item'

const ForwardRecordItem = React.forwardRef(RecordItem)

const Ledger = props => {
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')
  const [month, setMonth] = useState('')
  const [bill] = useBill()
  const [categories] = useCategories()

  // 过滤账单
  const firstMonth = useFirstMonth(bill)
  const billOfMonth = useBillOfMonth(month, bill)
  const filtedBill = useFiltedBill(category, type, billOfMonth)
  // 收支概览
  const [income, expenditure] = useBanalce(billOfMonth)
  // 类型下的分类数据
  const filtedCategories = useFiltedCategory(type, categories)
  // virtual-list height
  const [listRef, listHeight] = useListHeight(firstMonth)

  // 事件处理函数
  const handleTypeChange = useCallback(t => {
    setType(t.target.value)
    setCategory('')
  }, [])
  const handleCategoryChange = useCallback(t => {
    setCategory(t.target.value)
  }, [])
  const handleMonthChange = useCallback(t => {
    setMonth(t.target.value)
  }, [])

  // 默认显示为账单最后一个月份的数据
  useMemo(() => {
    setMonth(firstMonth)
  }, [firstMonth])

  if (!firstMonth) return null

  return (
    <Page>
      <Header right={<Link to="add">添加账单</Link>}>账单</Header>

      <PageContent className="ledger-main">
        <div className="filter-bar">
          <div className="filter-item">
            <label htmlFor="by-type">类型：</label>
            <select id="by-type" value={type} onChange={handleTypeChange}>
              <option value="">全部</option>
              {typeNameMap.map((t, idx) => (
                <option key={idx} value={idx}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="by-category">分类：</label>
            <select
              id="by-category"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">全部</option>
              {filtedCategories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="record-list-header">
          <div className="month-picker-box">
            <label htmlFor="month-picker">月份：</label>
            <input
              type="month"
              name="month-picker"
              id="month-picker"
              value={month}
              onChange={handleMonthChange}
            />
          </div>

          <Link to={`/overview/${month}`} className="balance">
            <div className="balance-content">
              <div>
                支出
                <span className="amount">￥{currencyFormter(expenditure)}</span>
              </div>
              <div>
                收入
                <span className="amount">￥{currencyFormter(income)}</span>
              </div>
            </div>
            <div className="arrow">
              <Icon icon="icon-jiantou" />
            </div>
          </Link>
        </div>

        <List
          data={filtedBill}
          itemHeight={60}
          height={listHeight}
          itemKey="id"
          className="record"
          ref={listRef}
        >
          {(b, i) => <ForwardRecordItem data={b} key={b.id} />}
        </List>
        {filtedBill.length === 0 && <Empty />}
      </PageContent>
    </Page>
  )
}

export default Ledger
