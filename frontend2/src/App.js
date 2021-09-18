import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import Game from './pages/Game'
import SignUp from './pages/SignUp'

import Header from './components/Header'
import AuthedRoute from './components/AuthedRoute'

import { AuthContextProvider, useAuthContext } from './store'

function App() {
  // const { token } = useAuthContext()

  // const authed = !!token
  const authed = true

  return (
    <Router>
      <div className='h-screen max-w-7xl mx-auto px-4 sm:px-6'>
        <Header authed={authed} />
        <AuthContextProvider>
          <Switch>
            <AuthedRoute auth={!authed} path='/login' component={Login} redirect='/' />
            <AuthedRoute auth={!authed} path='/signup' component={SignUp} redirect='/' />

            <AuthedRoute auth={authed} path='/game' component={Game} redirect='/login' />

            <Route path='/' component={Home} />
          </Switch>
        </AuthContextProvider>
      </div>
    </Router>
  );
}

export default App;
