import React from 'react';
import { Route, Switch } from 'react-router-dom';
import config from 'config'
import ProductExplorer from './product-explorer';
import ProductDetails from './product-details';
import { URIToURL, transformPropsAndWrapComponent } from '../../utils/router-mapping';

export const productLink = URIToURL(
  `${config.baseHost}/produits/indicateur/:product`,
  '/produits/indicateur/:product'
)

const ProductDetailsWrapped = transformPropsAndWrapComponent(
  'produits/indicateur/:product',
  {
    product: `${config.baseHost}/produits/indicateur/:product`
  },
  ProductDetails
)


export default (
  <Route path="/produits">
    <Switch>
      <Route exact path="/produits" component={ProductExplorer} />
      <Route
        path="/produits/indicateur/:product"
        component={ProductDetailsWrapped}
      />
    </Switch>
  </Route>
);
