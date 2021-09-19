import React from 'react'

import { SWRConfig } from 'swr'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Play from './pages/Play'

import { GameContextProvider } from './store'
import { fetcher } from './util'

import { ReactComponent as Logo } from './assets/logo.svg'

function App() {
  // const { token } = useAuthContext()

  // const authed = !!token

  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <div className='p-4 flex items-center'>
          <Logo className='text-indigo-400 fill-current' width='50' height='60' />
          <h1 className='font-semibold text-2xl ml-2 text-transparent bg-gradient-to-r from-indigo-400 to-indigo-700 bg-clip-text'>Speed Scribble</h1>
        </div>
        <div className='flex-grow max-w-7xl mx-auto px-4 sm:px-6 grid place-items-center'>
          <SWRConfig value={{ fetcher }}>
            <GameContextProvider>
              <Switch>
                <Route path='/play/:id' component={Play} />
                <Route path='/' component={Home} />
              </Switch>
            </GameContextProvider>
          </SWRConfig>
        </div>
      </div>
    </Router>
  );
}

export default App;
