import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import SeriesList from './series-list';
import Spinner from 'components/shared/spinner'
import D, { getLang } from 'i18n'

/**
 * Builds the query that retrieves the products issued of a given series.
 */
const queryBuilder = product => `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX prov: <http://www.w3.org/ns/prov#>
  SELECT ?series ?label
  FROM <http://rdf.insee.fr/graphes/produits>
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${product}> prov:wasGeneratedBy ?series .
    ?series skos:prefLabel ?label .
    FILTER (lang(?label) = '${getLang()}')
  }
  ORDER BY ?series
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'seriesByProducts',
  params: ['product']
})

function SeriesByProducts({ seriesByProducts, title }) {
  if (seriesByProducts.length === 0) {
    return <span />;
  }
  return <SeriesList series={seriesByProducts} title={title}/>
}

export default connector(SeriesByProducts, {
  loading: () => <Spinner text={D.loadingSeries}/>
})
