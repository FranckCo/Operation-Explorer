import React from 'react'
import { sparqlConnect } from 'sparql-connect'
import ProductList from './product-list'

const queryBuilder = () => `
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX dcat:  <http://www.w3.org/ns/dcat#>
  SELECT ?product ?name
  FROM <http://rdf.casd.eu/graphes/produits>
  WHERE {
  	?product a dcat:Dataset ; dcterms:title ?name .
    FILTER (lang(?name) = 'fr')
  }
  ORDER BY ?product
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'products'
})

function ProductExplorer( {products} ) {
  return(
    <div>
      <ProductList products={products}/>
    </div>
  )
}

export default connector(ProductExplorer, {
  loading: () => <span>Chargement de la liste des produits</span>
})
