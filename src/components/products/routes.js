import React from 'react';
import { Route } from 'react-router-dom';
import ProductExplorer from './product-explorer';

export default (
  <Route path="/products">
    <Route exact component={ProductExplorer} />
  </Route>
);
