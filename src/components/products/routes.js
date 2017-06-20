import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductExplorer from './product-explorer';
import ProductDetails from './product-details';
import { URIToURL, transformPropsAndWrapComponent } from '../../utils/router-mapping';

export const productLink = URIToURL(
  'http://id.casd.eu/produits/dataset/:product',
  '/products/:product'
)

const ProductDetailsWrapped = transformPropsAndWrapComponent(
  '/products/:product',
  {
    product: 'http://id.casd.eu/produits/dataset/:product'
  },
  ProductDetails
)


export default (
  <Route path="/products">
    <Switch>
      <Route exact path="/products" component={ProductExplorer} />
      <Route
        path="/products/:product"
        component={ProductDetailsWrapped}
      />
    </Switch>
  </Route>
);
