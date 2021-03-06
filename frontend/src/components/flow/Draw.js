import { useEffect, useRef } from 'react'

import Canvas from 'react-canvas-draw'

import {  TrashIcon, ReplyIcon } from '@heroicons/react/solid'

import Layout from '../Layout'
import Button from '../Button'
import Countdown from '../Countdown'

import { baseUrl, fetcher } from '../../util'
import { useGameContext } from '../../store'

const Draw = () => {
  const el = useRef()

  const { id, playerId, setFlowState } = useGameContext()

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

  const submit = async () => {
    const drawing = el.current.canvas['drawing']

    const exportCanvas = document.createElement('canvas')
    exportCanvas.width = drawing.width
    exportCanvas.height = drawing.height

    const ctx = exportCanvas.getContext('2d')
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    ctx.drawImage(drawing, 0, 0)

    exportCanvas.toBlob(async (blob) => {
      const file = new File([blob], 'drawing.png', { type: 'image/png' })

      // console.log(blob, file)

      await fetcher(`${baseUrl}/api/v1/game/${id}/submit_drawing?player=${playerId}`, {
        method: 'POST',
        body: file
      })

      setFlowState('results')
    }, 'image/png')
  }

  return (
    <Layout title={'Draw'} subtitle={`Recreate the picture you saw`}>
      <div className='p-4 bg-gray-100 rounded-lg'>
        <div className='flex justify-around'>
          <div className='flex justify-center mr-4 flex-col'>
            <Button className='mb-4 px-2 rounded-full' onClick={() => { el.current.undo() }}><ReplyIcon className='w-5 h-c5' /></Button>
            <Button className='mb-4 px-2 rounded-full' onClick={() => { el.current.clear() }}><TrashIcon className='w-5 h-5' /></Button>
          </div>

          <Canvas ref={el} canvasWidth={500} canvasHeight={500} brushRadius={3} hideGrid hideInterface lazyRadius={0} brushColor={'#000000'} />
        </div>
      </div>
      <Countdown totalTime={30} onCompleted={() => submit()} />
    </Layout>
  ) 
}

export default Draw
