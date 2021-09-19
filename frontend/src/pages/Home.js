import { useHistory } from 'react-router-dom'

import Layout from '../components/Layout'
import Button from '../components/Button'

import { useGameContext } from '../store'

import { baseUrl, fetcher } from '../util'

import { ReactComponent as Logo } from '../assets/logo.svg'

const Home = () => {
  const history = useHistory()
  const { setId, setFlowState } = useGameContext()

  const createGame = async () => {
    const { url } = await fetcher(`${baseUrl}/api/v1/create_game`, { method: 'POST' })
    const parts = url.split('/')
    const id = parts[parts.length - 1]
    setId(id)
    setFlowState('pregame')
    await history.push(`/play/${id}`)
  }

  const title = (
    <div className='flex items-center justify-center mb-4'>
      <Logo className='text-indigo-400 fill-current' width="70" height="80" />
      <h1 className='font-semibold text-5xl ml-2 text-transparent bg-gradient-to-r from-indigo-400 to-indigo-700 bg-clip-text'>Speed Scribble</h1>
    </div>
  )

  return (
    <Layout title={title} subtitle='Draw and compete with your friends in 1 minute!'>
      <Button onClick={() => createGame()}>Play</Button>
    </Layout>
  )
}

export default Home
