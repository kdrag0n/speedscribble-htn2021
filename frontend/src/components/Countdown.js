import { useEffect, useState } from 'react'

const Countdown = ({ totalTime = 10, onCompleted = () => null }) => {
  const [time, setTime] = useState(totalTime)

  useEffect(() => {
    if (time === 0) {
      return
    }

    const timer = setTimeout(() => {
      setTime(t => t - 1)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [time])

  return (
    <>
      <span className='font-medium mt-12 mb-4 text-2xl text-gray-600'>{time} {time !== 1 ? 'seconds' : 'second'} left</span>
      <div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200 w-full max-w-screen-md'>
        <div style={{ width: `${(time / totalTime) * 100}%` }} className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-1000' />
      </div>
    </>
  )
}

export default Countdown
