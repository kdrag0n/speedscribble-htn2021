import { useHistory } from 'react-router-dom'

import Layout from '../components/Layout'
import Button from '../components/Button'

import { useGameContext } from '../store'

import { baseUrl, fetcher } from '../util'

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

  return (
    <Layout title='HTN Draw' subtitle='Draw and compete with your friends in 1 minute!'>
      <Button onClick={() => createGame()}>Play</Button>
    </Layout>
  )
}

export default Home
