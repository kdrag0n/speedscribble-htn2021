import { useHistory } from 'react-router'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import Layout from '../Layout'
import Button from '../Button'

import { useGameContext } from '../../store'
import { baseUrl, fetcher } from '../../util'

const Winner = ({ title, similarity, img }) => {
  return (
    <div className='flex flex-col col-span-3 items-center justify-center'>
      <h2 className='font-medium text-2xl mb-2 mt-auto'>{title}</h2>
      <h3 className='text-lg text-gray-700 mb-6'>{similarity}% similar</h3>
      <div className='p-4 bg-green-300 rounded-3xl flex items-center justify-center shadow-2xl'>
        <img className='w-auto rounded-xl' src={img} alt='img' />
      </div>
    </div>
  )
}

const Loser = ({ title, similarity, img }) => {
  return (
    <div className='flex flex-col col-span-2 items-center justify-center'>
      <h2 className='font-medium text-2xl mb-2'>{title}</h2>
      <h3 className='text-lg text-gray-700 mb-6'>{similarity}% similar</h3>
      <div className='p-2 bg-gray-100 rounded-lg flex items-center justify-center'>
        <img className='w-auto rounded-lg' src={img} alt='img' />
      </div>
    </div>
  )
}

const Reference = ({ img }) => {
  return (
    <div className='flex flex-col col-span-2 items-center justify-center'>
      <h2 className='font-medium text-2xl mb-6'>Reference</h2>
      <div className='p-2 bg-gray-100 rounded-lg flex items-center justify-center'>
        <img className='w-auto rounded-lg' src={img} alt='reference' />
      </div>
    </div>
  )
}

const Results = ({ winner, drawings, nextGameId }) => {
  const { width, height } = useWindowSize()
  const history = useHistory()
  const { setId, playerId, refImage, setPlayerId, setFlowState, setRefImage } = useGameContext()

  // console.log(winner, drawings)
  if (!drawings || (drawings && Object.keys(drawings).length === 0) || !winner) return (
    <Layout title='Loading results…'>
      <div className='flex flex-row w-full max-w-screen-md'>
        <svg className='animate-spin h-12 w-12 text-indigo-600 mx-auto mt-24' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' stroke-width='4'></circle>
          <path fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
        </svg>
      </div>
    </Layout>
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
    <Layout title={iWon ? 'You win!' : 'You lose'} textClassName={iWon ? 'text-green-600' : 'text-red-600'}>
      <div className='space-y-4 lg:space-y-0 lg:grid grid-cols-7 gap-6 mb-6'>
        <Reference img={refImage} />

        <MyComponent title='Your drawing' similarity={Math.floor(drawings[playerId].similarity * 100)} img={drawings[playerId].url} />
      
        <FriendComponent title={'Opponent\'s drawing'} similarity={Math.floor(drawings[friendId].similarity * 100)} img={drawings[friendId].url} />
      </div>

      {nextGameId && <Button className='px-4 mt-4' onClick={() => newGame()}>Play again</Button>}

      {iWon && <Confetti width={width} height={height} />}
    </Layout>
  )
}

export default Results
