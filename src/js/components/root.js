import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from '../utils/configure-store'
//We work with `redux`, so our app will need a reducer
import { getReducer } from 'sparql-connect'
import routes from './routes'

// We need to create a store. `configureStore` adds a little extra config to
// allow working with asyncrhonous actions and using the redux dev tools.
const store = configureStore(getReducer())
  
export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          { routes }
        </Router>
      </Provider>
    )
  }
}
