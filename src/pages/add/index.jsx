import './index.css'

import { Link } from 'react-router-dom'
import React, { useState } from 'react'

import { typeNameMap } from 'helper'
import Header from 'components/header'
import Icon from 'components/icon'
import Page, { PageContent } from 'components/page'

import { submitOrder } from './api'
import { useCategories, useFiltedCategory } from '../ledger/state'

const initState = { amount: null, time: null, type: '0', category: '' }

const Add = props => {
  const { history } = props
  const [formData, setFormData] = useState(initState)
  const [categories] = useCategories()
  const { amount, time, type, category } = formData

  // 类型下的分类数据
  const filtedCategories = useFiltedCategory(type, categories)

  // 事件处理函数
  const handleAmountChange = t => {
    setFormData({ ...formData, amount: t.target.value })
  }
  const handleTimeChange = t => {
    setFormData({ ...formData, time: t.target.value })
  }
  const handleTypeChange = t => {
    setFormData({ ...formData, type: t.target.value, category: '' })
  }
  const handleCategoryChange = t => {
    setFormData({ ...formData, category: t.target.value })
  }
  const handleSubmit = e => {
    e.preventDefault()
    const { amount, time, ...others } = formData
    const data = {
      amount: (+amount).toFixed(2),
      time: +new Date(time),
      ...others
    }

    submitOrder(data)
      .then(data => {
        alert('添加账单成功！')
        history.goBack()
      })
      .catch(e => {
        alert('添加账单失败！')
      })
  }

  return (
    <Page className="add-page">
      <Header
        left={
          <Link to="/">
            <Icon icon="icon-jiantouzuo" />
          </Link>
        }
      >
        添加账单
      </Header>
      <PageContent>
        <form action="" onSubmit={handleSubmit}>
          <div className="field-item">
            <label className="field-label" htmlFor="">
              金额：
            </label>
            <div className="field-input">
              <input
                type="text"
                name="amount"
                id="amount"
                value={amount || ''}
                onChange={handleAmountChange}
                required
                pattern="[1-9]\d*(\.\d{1,2})?"
              />
            </div>
          </div>

          <div className="field-item">
            <label className="field-label" htmlFor="time">
              时间：
            </label>
            <div className="field-input">
              <input
                type="datetime-local"
                name="time"
                id="time"
                value={time || ''}
                onChange={handleTimeChange}
                required
              />
            </div>
          </div>

          <div className="field-item">
            <label className="field-label" htmlFor="by-type">
              类型：
            </label>
            <div className="field-input">
              {typeNameMap.map((t, i) => (
                <label key={i} className="radio-label">
                  <input
                    type="radio"
                    name="type"
                    value={i || ''}
                    checked={i === +type}
                    onChange={handleTypeChange}
                  />{' '}
                  {t}
                </label>
              ))}
            </div>
          </div>

          <div className="field-item">
            <label className="field-label" htmlFor="by-category">
              分类：
            </label>
            <div className="field-input">
              <select
                name="category"
                id="by-category"
                value={category}
                onChange={handleCategoryChange}
                required
              >
                <option value="">请选择</option>
                {filtedCategories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            添加
          </button>
        </form>
      </PageContent>
    </Page>
  )
}

export default Add
