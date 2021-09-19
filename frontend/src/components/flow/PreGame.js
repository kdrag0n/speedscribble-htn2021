import { useParams } from 'react-router'

import Layout from '../Layout'
import Button from '../Button'

const Waiting = ({ ready = false }) => {
  const { id } = useParams()
  const url = `http://localhost:3000/play/${id}`

  const waitingEls = (
    <>
      <input className='bg-gray-100 border-2 border-gray-600 rounded-md p-2 mr-2 flex-1' disabled value={url} />
      <Button onClick={() => navigator.clipboard.writeText(url)}>Copy</Button>
    </>
  )

  const startGame = (
    <Button onClick={() => null} className='mx-auto'>Start Game</Button>
  )

  return (
    <Layout title={ready ? 'Ready to start' : 'Share this link with a friend'} subtitle={ready ? 'Opponent connected' : 'Waiting for opponent…'}>
      <div className='flex flex-row w-full max-w-screen-md'>
        {ready ? startGame : waitingEls}
      </div> 
    </Layout>
  )
}

export default Waiting
