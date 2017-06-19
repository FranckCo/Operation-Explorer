import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductExplorer from './product-explorer';
import ProductDetails from './product-details';
import { proccessPatterns } from '../../utils/router-mapping';

export const { link: productLink, transform: productTransform } = proccessPatterns(
  'http://id.casd.eu/produits/dataset/:product',
  '/products/:product'
);

export default (
  <Route path="/products">
    <Switch>
      <Route exact path="/products" component={ProductExplorer} />
      <Route
        path="/products/:product"
        component={productTransform(ProductDetails)}
      />
    </Switch>
  </Route>
);
