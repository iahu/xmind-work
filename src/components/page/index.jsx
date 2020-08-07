import React from 'react'

const Page = props => {
  const { children, className = null, ...others } = props
  return (
    <div className={`page ${className}`} {...others}>
      {children}
    </div>
  )
}

export default Page

export const PageContent = props => {
  const { children, className = null, ...others } = props
  return (
    <div className={`page-content ${className}`} {...others}>
      {children}
    </div>
  )
}
