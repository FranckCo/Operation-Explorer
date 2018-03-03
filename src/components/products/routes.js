import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductExplorer from './product-explorer';
import ProductDetails from './product-details';
import { URIToURL, transformPropsAndWrapComponent } from '../../utils/router-mapping';

export const productLink = URIToURL(
  'http://id.insee.fr/produits/indicateur/:product',
  '/produits/:product'
)

const ProductDetailsWrapped = transformPropsAndWrapComponent(
  '/produits/:product',
  {
    product: 'http://id.insee.fr/produits/indicateur/:product'
  },
  ProductDetails
)


export default (
  <Route path="/produits">
    <Switch>
      <Route exact path="/produits" component={ProductExplorer} />
      <Route
        path="/produits/:product"
        component={ProductDetailsWrapped}
      />
    </Switch>
  </Route>
);
