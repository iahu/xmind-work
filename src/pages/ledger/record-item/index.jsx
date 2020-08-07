import './index.css'

import React from 'react'

import { currencyFormter, timeFormater, typeMarker } from 'helper'
import Icon from 'components/icon'

import { iconClsMap } from './config'

const RecordItem = (props, ref) => {
  const { type, category, categoryName, time, amount } = props.data

  return (
    <div className="record-item" ref={ref}>
      <Icon icon={`${iconClsMap[category] || 'icon-xiaofei'}`} />

      <div className="record-content">
        <div className="r-item-header">
          <span className="category-name">{categoryName}</span>
          <span className="amount" data-type={type}>
            {typeMarker(type)}
            {currencyFormter(amount)}
          </span>
        </div>
        <div className="r-item-footer">
          <span className="time">{timeFormater(time)}</span>
        </div>
      </div>
    </div>
  )
}

export default RecordItem
