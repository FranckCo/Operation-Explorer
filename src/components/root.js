import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../utils/configure-store';
//We work with `redux`, so our app will need a reducer
import { getReducer, setQueryURL } from 'sparql-connect';
import App from './app';
import config from '../config';

setQueryURL(config.queryURL);
// We need to create a store. `configureStore` adds a little extra config to
// allow working with asyncrhonous actions and using the redux dev tools.
const store = configureStore(getReducer());

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" component={App}>
          </Route>
        </Router>
      </Provider>
    );
  }
}
