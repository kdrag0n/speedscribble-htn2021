import { useEffect, useRef } from 'react'

import Canvas from 'react-canvas-draw'

import Layout from '../Layout'
import Button from '../Button'
import Countdown from '../Countdown'

const Draw = () => {
  const el = useRef()

  useEffect(() => {
    if (!el.current) return

    const listener = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        el.current.undo()
      }
    }

    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [el])

  return (
    <Layout title={'Draw'} subtitle={`Recreate the picture you saw`}>
      <div className='p-4 bg-gray-100 rounded-lg'>
        <div className='flex justify-around'>
          <div className='flex justify-center mr-4 flex-col'>
            <Button className='mb-4' onClick={() => { el.current.undo() }}>Undo</Button>
            <Button className='mb-4' onClick={() => { el.current.clear() }}>Clear</Button>
          </div>

          <Canvas ref={el} canvasWidth={500} canvasHeight={500} brushRadius={3} hideGrid hideInterface lazyRadius={0} brushColor={'#000000'} />
        </div>
      </div>
      <Countdown totalTime={30} />
    </Layout>
  ) 
}

export default Draw
