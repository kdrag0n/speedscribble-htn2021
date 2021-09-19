import Layout from '../Layout'
import Button from '../Button'

import { useGameContext } from '../../store'
import { baseUrl, fetcher } from '../../util'
import { useEffect } from 'react'

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

  const url = `${baseUrl}/play/${id}`

  const waitingEls = (
    <>
      <input className='bg-gray-100 border-2 border-gray-600 rounded-md p-2 mr-2 flex-1' disabled value={url} />
      <Button onClick={() => navigator.clipboard.writeText(url)}>Copy</Button>
    </>
  )

  const startGame = (
    <Button onClick={async () => {
      await fetcher(`${baseUrl}/api/v1/game/${id}/start`, { method: 'POST' })
    }} className='mx-auto'>Start Game</Button>
  )

  const ready = flowState === 'ready'

  return (
    <Layout title={ready ? 'Ready to start' : 'Share this link with a friend'} subtitle={ready ? 'Opponent connected' : 'Waiting for opponent…'}>
      <div className='flex flex-row w-full max-w-screen-md'>
        {ready ? startGame : waitingEls}
      </div> 
    </Layout>
  )
}

export default Waiting
