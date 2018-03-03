import React from 'react'
import { sparqlConnect } from 'sparql-connect'
import ProductList from './product-list'
import { sortArrayByKey } from 'utils/sort-array'
import { getLang } from 'i18n'

const sortArray = sortArrayByKey('label');

const queryBuilder = () => `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX insee: <http://rdf.insee.fr/def/base#>
  SELECT ?product ?label
  FROM <http://rdf.insee.fr/graphes/produits>
  WHERE {
  	?product a insee:StatisticalIndicator ; skos:prefLabel ?label .
    FILTER (lang(?label) = '${getLang()}')
  }
  ORDER BY ?product
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'products'
})

function ProductExplorer( {products} ) {
  return(
    <div>
      <ProductList products={sortArray(products)}/>
    </div>
  )
}

export default connector(ProductExplorer, {
  loading: () => <span>Chargement de la liste des produits</span>
})
