import React from 'react'

const Layout = ({ title, subtitle = '', children }) => {
  return (
    <div className='mt-32 text-center'>
      <div>
        <h1 className='font-semibold text-6xl text-indigo-600 mb-4'>{title}</h1>
        {!!subtitle ? <span className='font-semibold text-2xl text-gray-700'>{subtitle}</span> : null}
      </div>
      <div className='flex flex-col mt-24 items-center justify-center'>
        {children}
      </div>
    </div>
  )
}

export default Layout
