import React from 'react'

const Layout = ({ title, subtitle = '', children }) => {
  return (
    <div className='mt-6 pb-16 text-center'>
      <div>
        <h1 className='font-semibold text-5xl text-indigo-600 mb-4'>{title}</h1>
        {!!subtitle ? <span className='text-xl text-gray-600'>{subtitle}</span> : null}
      </div>
      <div className='flex flex-col mt-12 items-center justify-center'>
        {children}
      </div>
    </div>
  )
}

export default Layout
