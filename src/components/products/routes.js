import React from 'react';
import { Route } from 'react-router-dom';
import ProductExplorer from './product-explorer';
import { proccessPatterns } from '../../utils/router-mapping';

export const { link: productLink, transform: productTransform } = proccessPatterns(
  'http://id.casd.eu/produits/dataset/:product',
  '/products/:product'
);

export default (
  <Route path="/products">
    <Route exact component={ProductExplorer} />
  </Route>
);
