import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import ProductList from './product-list';
import Spinner from 'components/shared/spinner'
import D, { getLang } from 'i18n'

/**
 * Builds the query that retrieves the products issued of  a given operation or series.
 */
const queryBuilder = operation => `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX prov: <http://www.w3.org/ns/prov#>
  SELECT ?product ?label
  FROM <http://rdf.casd.eu/graphes/produits>
  WHERE {
    ?product prov:wasGeneratedBy <${operation}> .
    ?product skos:prefLabel ?label .
    FILTER (lang(?label) = '${getLang()}')
  }
  ORDER BY ?product
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'productsByOperation',
  params: ['operation']
})

function ProductsByOperation({ productsByOperation, title }) {
  if (productsByOperation.length === 0) {
    return <span>{D.operationHoldsNoProduct}</span>
  }
  return <ProductList products={productsByOperation} title={title} />
}

export default connector(ProductsByOperation, {
  loading: () => <Spinner text={D.loadingProducts} />
})
