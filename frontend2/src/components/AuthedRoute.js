import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const AuthedRoute = (props) => {
  const { component: Component, auth, redirect = '/login', ...attr } = props

  return (
    <Route
      {...attr}
      render={(props) => auth
        ? <Component {...props} />
        : <Redirect to={redirect} />}
    />
  )
}

export default AuthedRoute
