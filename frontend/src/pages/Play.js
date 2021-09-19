import { useEffect, useState } from 'react'

import { useHistory, useParams } from 'react-router'
import useSWR from 'swr'

import Layout from '../components/Layout'
import PreGame from '../components/flow/PreGame'
import Memorize from '../components/flow/Memorize'
import Draw from '../components/flow/Draw'
import Results from '../components/flow/Results'

import { baseUrl, fetcher } from '../util'
import { useGameContext } from '../store'

const Game = () => {
  const history = useHistory()
  const [ready, setReady] = useState(false)

  let { id: paramsId } = useParams()
  const { id, setId, flowState, setRefImage, setFlowState } = useGameContext()

  if (!id) setId(paramsId)
  const { data: gameInfo, error } = useSWR(`${baseUrl}/api/v1/game/${id || paramsId}/info`, fetcher, { refreshInterval: 100 })

  // initial check on mount
  useEffect(() => {
    if (!ready) {
      if (gameInfo) {
        if (gameInfo?.started || gameInfo?.finished || (gameInfo?.players || 0) > 1) history.push('/')
        else {
          setReady(true)
        }
      }
    } else {
      switch (flowState) {
        case 'pregame': {
          if (gameInfo?.players > 1) setFlowState('ready')
          break
        }
        case 'ready': {
          if (gameInfo?.started) {
            setRefImage(gameInfo.reference_image_url)
            setFlowState('memorize')
          }
          break
        }
        case 'memorize': {
          setTimeout(() => {
            // setFlowState('draw')
          }, 10 * 1000)
          break
        }
        case 'draw': {
          setTimeout(() => {
            // console.log('done drawing')
          }, gameInfo?.time_limit * 1000)
          break
        }
        default: break
      }
    }
  }, [gameInfo, flowState, history, ready, setFlowState, setRefImage, paramsId, id, setId])

  if (!gameInfo) return (
    <Layout title='Loading…'>
      <div className='flex flex-row w-full max-w-screen-md'>
        <svg className='animate-spin h-12 w-12 text-indigo-600 mx-auto mt-24' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' stroke-width='4'></circle>
          <path fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
        </svg>
      </div>
    </Layout>
  )
  if (error) history.push('/')

  if (!ready) return null

  switch (flowState) {
    case 'pregame':
    case 'ready': {
      return <PreGame />
    }
    case 'memorize': {
      return <Memorize />
    }
    case 'draw': {
      return <Draw />
    }
    case 'results': {
      return <Results winner={gameInfo?.winner} drawings={gameInfo?.drawings} nextGameId={gameInfo?.next_game_id} />
    }
    default: return null
  }
}

export default Game
