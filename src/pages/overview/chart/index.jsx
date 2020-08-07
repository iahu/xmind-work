import './index.css'

import React from 'react'

import { currencyFormter, noop } from 'helper'

export const ChartBar = props => {
  const {
    name,
    value,
    total,
    color,
    className = '',
    index,
    offset = 0,
    onClick = noop,
    ...others
  } = props
  const percent = +((100 * value) / total).toFixed(2)
  const handleClick = e => onClick(index)

  return (
    <div className={`chart-bar ${className}`} {...others}>
      <div className="tip">
        <span className="name">{name}</span>
        <span className="value">
          ￥{currencyFormter(value)}
          <i className="percent">({percent}%)</i>
        </span>
      </div>
      <div
        className="line"
        onClick={handleClick}
        role="button"
        aria-pressed="mixed"
      >
        <div
          className="line-inner"
          style={{
            width: `${percent}%`,
            marginLeft: `${(100 * offset).toFixed(2)}%`,
            backgroundColor: color
          }}
        ></div>
      </div>
    </div>
  )
}

const Chart = props => {
  const { children, ...others } = props
  return (
    <div className="chart" {...others}>
      {children}
    </div>
  )
}

export default Chart
