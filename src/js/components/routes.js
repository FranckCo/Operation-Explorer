import React from 'react'
import { Route } from 'react-router-dom'

import App from './app'
import Login from './login'
import Operations from './operations'
import FamilyExplorer from './family-explorer'

import { requireAuth } from '../utils/authentication'

export default (
  <div>
    <Route path="/login" component={Login} />
    <Route path="/" component={App} onEnter={requireAuth} />
    <Route path="/families">
      <Route exact component={FamilyExplorer}/>
    </Route>
	  <Route path="/operations">
      <Route exact component={Operations} />
    </Route>
  </div>
)
