import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import ProductList from './product-list';

/**
 * Builds the query that retrieves the products issued of  a given operation or series.
 */
const queryBuilder = operation => `
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX prov: <http://www.w3.org/ns/prov#>
  SELECT ?product ?name
  FROM <http://rdf.casd.eu/graphes/produits>
  WHERE {
    ?product prov:wasGeneratedBy <${operation}> .
    ?product dcterms:title ?name .
    FILTER (lang(?name) = "fr")
  }
  ORDER BY ?product
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'productsByOperation',
  params: ['operation']
})

function ProductsByOperation({ productsByOperation }) {
  if (productsByOperation.length === 0) {
    return <span>Aucun produit n&apos;est issu de cette opération</span>
  }
  return <ProductList products={productsByOperation} />
}

export default connector(ProductsByOperation, {
  loading: () => <span>Chargement de la liste des produits</span>
})
