import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './app'
import Login from './login'
import OperationExplorer from './operation-explorer'
import FamilyExplorer from './family-explorer'
import SeriesExplorer from './series-explorer'

import { requireAuth } from '../utils/authentication'

export default (
  <div>
    <Route path="/login" component={Login} />
    <Route path="/" component={App} onEnter={requireAuth} >
    <Route path="/families">
      <IndexRoute component={FamilyExplorer}/>
    </Route>
    <Route path="/series">
      <IndexRoute component={SeriesExplorer}/>
    </Route>
      <Route path="/operations">
        <IndexRoute component={OperationExplorer} />
      </Route>
    </Route>
  </div>
)
