import { useHistory } from 'react-router'

import Layout from '../Layout'
import Button from '../Button'

import { useGameContext } from '../../store'
import { baseUrl, fetcher } from '../../util'

const Winner = ({ title, similarity, img }) => {
  return (
    <div className='flex flex-col col-span-3 items-center justify-center'>
      <h2 className='font-medium text-2xl text-indigo-700 mb-2 mt-auto'>{title}</h2>
      <h3 className='text-lg text-gray-700 mb-6'>{similarity}% similarity</h3>
      <div className='p-4 bg-green-300 rounded-3xl flex items-center justify-center shadow-2xl'>
        <img className='w-auto rounded-xl' src={img} alt='img' />
      </div>
    </div>
  )
}

const Loser = ({ title, similarity, img }) => {
  return (
    <div className='flex flex-col col-span-2 items-center justify-center'>
      <h2 className='font-medium text-2xl text-indigo-700 mb-2'>{title}</h2>
      <h3 className='text-lg text-gray-700 mb-6'>{similarity}% similarity</h3>
      <div className='p-2 bg-gray-100 rounded-lg flex items-center justify-center'>
        <img className='w-auto rounded-lg' src={img} alt='img' />
      </div>
    </div>
  )
}

const Reference = ({ img }) => {
  return (
    <div className='flex flex-col col-span-2 items-center justify-center'>
      <h2 className='font-medium text-2xl text-indigo-600 mb-6'>Reference</h2>
      <div className='p-2 bg-gray-100 rounded-lg flex items-center justify-center'>
        <img className='w-auto rounded-lg' src={img} alt='reference' />
      </div>
    </div>
  )
}

const Results = ({ winner, drawings, nextGameId }) => {
  const history = useHistory()
  const { setId, playerId, refImage, setPlayerId, setFlowState, setRefImage } = useGameContext()

  // console.log(winner, drawings)
  if (!drawings || (drawings && Object.keys(drawings).length === 0) || !winner) return (
    <Layout title='Loading results...' />
  )

  const iWon = winner === playerId

  const MyComponent = iWon ? Winner : Loser
  const FriendComponent = !iWon ? Winner : Loser

  const friendId = Object.keys(drawings).find(el => el !== playerId)
  // console.log(friendId)

  const newGame = async () => {
    await fetcher(`${baseUrl}/api/v1/create_game?id=${nextGameId}`, { method: 'POST' })
    setId(nextGameId)
    setPlayerId('')
    setRefImage('')
    setFlowState('pregame')
    history.push(`/play/${nextGameId}`)
  }

  return (
    <Layout title={iWon ? 'You win!' : 'You lose'}>
      <div className='space-y-4 lg:space-y-0 lg:grid grid-cols-7 gap-4'>
        <Reference img={refImage} />

        <MyComponent title='Your drawing' similarity={Math.floor(drawings[playerId].similarity * 100)} img={drawings[playerId].url} />
      
        <FriendComponent title={'Your friend\'s drawing'} similarity={Math.floor(drawings[friendId].similarity * 100)} img={drawings[friendId].url} />
      </div>

      {nextGameId && <Button className='mt-4' onClick={() => newGame()}>New Game</Button>}
    </Layout>
  )
}

export default Results
