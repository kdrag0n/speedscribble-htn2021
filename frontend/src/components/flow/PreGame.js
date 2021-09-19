import { useEffect } from 'react'

import { ClipboardCopyIcon } from '@heroicons/react/solid'

import Layout from '../Layout'
import Button from '../Button'

import { useGameContext } from '../../store'
import { baseUrl, frontendBaseUrl, fetcher } from '../../util'

const Waiting = () => {
  const { id, flowState, playerId, setPlayerId } = useGameContext()

  useEffect(() => {
    if (!playerId) {
      (async () => {
        const { id: newPlayerId } = await fetcher(`${baseUrl}/api/v1/game/${id}/new_player`, { method: 'POST' })
        setPlayerId(newPlayerId)
      })()
    }
  }, [id, playerId, setPlayerId])

  const url = `${frontendBaseUrl}/play/${id}`

  const waitingEls = (
    <div className='w-full'>
      <div className='flex flex-row w-full'>
        <input className='bg-gray-100 border-2 border-gray-600 rounded-md p-2 mr-2 flex-1' disabled value={url} />
        <Button onClick={() => navigator.clipboard.writeText(url)}><ClipboardCopyIcon className='h-5 w-5' /></Button>
      </div>

      <svg className='animate-spin h-12 w-12 text-indigo-600 mx-auto mt-24' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' stroke-width='4'></circle>
        <path fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
      </svg>
    </div>
  )

  const startGame = (
    <Button onClick={async () => {
      await fetcher(`${baseUrl}/api/v1/game/${id}/start`, { method: 'POST' })
    }} className='mx-auto px-4'>Start game</Button>
  )

  const ready = flowState === 'ready'
  
  useEffect(() => {
    navigator.clipboard.writeText(url)
  }, [url])

  return (
    <Layout title={ready ? 'Ready to start' : 'Share this link with a friend'} subtitle={ready ? 'Opponent connected' : 'Waiting for opponent…'}>
      <div className='flex flex-row w-full max-w-screen-md'>
        {ready ? startGame : waitingEls}
      </div> 
    </Layout>
  )
}

export default Waiting
