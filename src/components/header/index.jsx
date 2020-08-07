import './index.css'

import React from 'react'

const Header = props => {
  const { children, left = null, right = null, ...others } = props

  return (
    <header className="app-header" {...others}>
      <div className="app-header-left">{left}</div>
      <h1 className="app-header-name">{children}</h1>
      <div className="app-header-right">{right}</div>
    </header>
  )
}

export default Header
