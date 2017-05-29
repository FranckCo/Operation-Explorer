import React from 'react'
import { Route } from 'react-router-dom'

import App from './app'
import Login from './login'
import Operations from './operations'

import { requireAuth } from '../utils/authentication'

export default (
  <div>
    <Route path="/login" component={Login} />
    <Route path="/" component={App} onEnter={requireAuth} />
	  <Route path="/operations">
      <Route exact component={Operations} />
    </Route>
  </div>
)