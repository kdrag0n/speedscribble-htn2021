import React from 'react'

import { SWRConfig } from 'swr'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Play from './pages/Play'

import { GameContextProvider } from './store'
import { fetcher } from './util'

function App() {
  // const { token } = useAuthContext()

  // const authed = !!token

  return (
    <Router>
      <div className='p-4'>
        <h1 className='font-extrabold text-4xl'>Game</h1>
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <SWRConfig value={{ fetcher }}>
          <GameContextProvider>
            <Switch>
              <Route path='/play/:id' component={Play} />
              <Route path='/' component={Home} />
            </Switch>
          </GameContextProvider>
        </SWRConfig>
      </div>
    </Router>
  );
}

export default App;
