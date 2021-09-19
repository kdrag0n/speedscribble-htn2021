import { useEffect, useState } from 'react'

import { useHistory, useParams } from 'react-router'

import PreGame from '../components/flow/PreGame'
import Memorize from '../components/flow/Memorize'
import Draw from '../components/flow/Draw'
import Results from '../components/flow/Results'

import { baseUrl, fetcher } from '../util'
import { useGameContext } from '../store'
import useSWR from 'swr'
import Layout from '../components/Layout'

const Game = () => {
  const history = useHistory()
  const [ready, setReady] = useState(false)

  const { id: paramsId } = useParams()
  const { id, setId, flowState, setRefImage, setFlowState } = useGameContext()

  const { data: gameInfo, error } = useSWR(`${baseUrl}/api/v1/game/${id}/info`, fetcher, { refreshInterval: 100 })

  // initial check on mount
  useEffect(() => {
    if (!ready) {
      if (gameInfo?.started || gameInfo?.players > 1) history.push('/')
      else {
        setReady(true)
        if (!id) setId(paramsId)
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
    <Layout title='Loading...' />
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