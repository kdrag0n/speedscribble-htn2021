import React, { useState, useContext } from 'react'

const GameContext = React.createContext({
  url: '',
  setUrl: (url) => null,

  id: '',
  setId: (id) => null,

  playerId: '',
  setPlayerId: (id) => null,
  
  image: '',
  setImage: (image) => null,
  
  refImage: '',
  setRefImage: (image) => null,
  
  flowState: 'pregame',
  setFlowState: (state) => null
})

export const useGameContext = () => useContext(GameContext)

export const GameContextProvider = ({ children }) => {
  const [id, setId] = useState('')
  const [playerId, setPlayerId] = useState('')

  const [localImage, setLocalImage] = useState('')
  const [refImage, setRefImage] = useState('')

  const [flowState, setFlowState] = useState('results')

  return (
    <GameContext.Provider value={{ id, setId, playerId, setPlayerId, image: localImage, setImage: setLocalImage, refImage, setRefImage, flowState, setFlowState }}>
      {children}
    </GameContext.Provider>
  )
}
