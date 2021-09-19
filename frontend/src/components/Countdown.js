import { useEffect, useState } from 'react'

const Countdown = ({ totalTime = 10, onCompleted = () => null }) => {
  const [time, setTime] = useState(totalTime)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (time === 0) {
      onCompleted()
      return
    }

    const timer = setTimeout(() => {
      setTime(t => t - 1)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [time, onCompleted])

  useEffect(() => {
    let start = null;
    let raf = null

    let step = timestamp => {
      if (!start) start = timestamp
      let progress = timestamp - start
      setProgress(progress)
      if (progress > totalTime * 1000) return
      raf = requestAnimationFrame(step)
    };
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
    }
  }, [totalTime])

  const percentage = Math.min(progress / 10 / totalTime, totalTime * 1000)

  return (
    <>
      <span className='font-medium mt-12 mb-4 text-2xl text-gray-600'>{time} {time !== 1 ? 'seconds' : 'second'} left</span>
      <div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200 w-full max-w-screen-md'>
        <div style={{ width: `${100 - percentage}%` }} className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600' />
      </div>
    </>
  )
}

export default Countdown
