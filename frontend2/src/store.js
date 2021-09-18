import React, { useState, useContext } from 'react'

const AuthenticationContext = React.createContext({ token: '', setToken: (token) => null })

export const useAuthContext = () => useContext(AuthenticationContext)

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState('')

  return (
    <AuthenticationContext.Provider value={{ token, setToken }}>
      {children}
    </AuthenticationContext.Provider>
  )
}
