import React from 'react'
import { Route } from 'react-router'

import App from './app'
import Login from './login'
import Operations from './operations'

import { requireAuth } from '../utils/authentication'

export default (
  <Route>
    <Route path="/login" component={Login} />
    <Route path="/" component={App} onEnter={requireAuth} >
	  <Route path="/operations">
      <IndexRoute component={Operations} />
    </Route>
  </Route>
)