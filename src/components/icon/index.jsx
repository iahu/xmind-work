import React from 'react'

const Icon = ({ icon }) => {
  // return <i className={`iconfont ${icon}`} />
  return (
    <svg className="icon" aria-hidden="true">
      <use xlinkHref={`#${icon}`}></use>
    </svg>
  )
}

export default Icon
