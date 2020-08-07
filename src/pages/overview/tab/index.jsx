import './index.css'

import React from 'react'

import { noop } from 'helper'

export const TabItem = props => {
  const {
    className = '',
    active,
    name,
    value,
    id,
    onClick = noop,
    ...others
  } = props
  const handleClick = () => onClick(id)

  return (
    <li
      className={`tab-item ${className} ${active ? 'active' : ''}`}
      onClick={handleClick}
      role="button"
      aria-pressed={active.toString()}
      {...others}
    >
      <div className="name">{name}</div>
      <div className="value">{value}</div>
    </li>
  )
}

const Tab = props => {
  const { children, ...others } = props
  return (
    <ul className="tab" {...others}>
      {children}
    </ul>
  )
}

export default Tab
