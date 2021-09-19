import React from 'react'
import { classNames } from '../util'

const Layout = ({ title, subtitle = '', textClassName = 'text-indigo-600', children }) => {
  return (
    <div className='mt-6 pb-16 text-center'>
      <div>
        <h1 className={classNames('font-semibold text-5xl mb-4', textClassName)}>{title}</h1>
        {!!subtitle ? <span className='text-xl text-gray-600'>{subtitle}</span> : null}
      </div>
      <div className='flex flex-col mt-12 items-center justify-center'>
        {children}
      </div>
    </div>
  )
}

export default Layout
