import React from 'react'

import Icon from 'components/icon'

import './index.css'

const Empty = props => {
  const { children = <div>无相关数据</div>, ...others } = props

  return (
    <div className="empty" {...others}>
      <Icon icon="icon-emptysafe" />
      {children}
    </div>
  )
}

export default Empty
