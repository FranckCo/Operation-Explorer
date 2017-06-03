import React from 'react';
import { Route, IndexRoute } from 'react-router';
import ProductExplorer from './product-explorer';

export default (
  <Route path="/products">
    <IndexRoute component={ProductExplorer} />
  </Route>
);
