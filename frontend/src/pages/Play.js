import { useEffect, useState } from 'react'

import PreGame from '../components/flow/PreGame'
import Memorize from '../components/flow/Memorize'
import Draw from '../components/flow/Draw'
import Results from '../components/flow/Results'

import { fetcher } from '../util'
import { useGameContext } from '../store'

const Game = () => {
  const [ready, setReady] = useState(false)

  const { flowState } = useGameContext()

  useEffect(() => {
    // await fetcher('/')
  }, [])

  switch (flowState) {
    case 'pregame': {
      return <PreGame ready={false} />
    }
    case 'memorize': {
      return <Memorize />
    }
    case 'draw': {
      return <Draw />
    }
    case 'results': {
      return <Results />
    }
    default: return null
  }
}

export default Game