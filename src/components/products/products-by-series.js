import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import ProductList from './product-list';
import Spinner from 'components/shared/spinner'
import D, { getLang } from 'i18n'

/**
 * Builds the query that retrieves the products issued of a given series.
 */
const queryBuilder = series => `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX prov: <http://www.w3.org/ns/prov#>
  SELECT ?product ?label
  FROM <http://rdf.insee.fr/graphes/produits>
  WHERE {
    ?product prov:wasGeneratedBy <${series}> .
    ?product skos:prefLabel ?label .
    FILTER (lang(?label) = '${getLang()}')
  }
  ORDER BY ?product
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'productsBySeries',
  params: ['series']
})

function ProductsBySeries({ productsBySeries, title }) {
  if (productsBySeries.length === 0) {
    return <span>{D.seriesHoldsNoProduct}</span>
  }
  return <ProductList products={productsBySeries} title={title} />
}

export default connector(ProductsBySeries, {
  loading: () => <Spinner text={D.loadingProducts} />
})
