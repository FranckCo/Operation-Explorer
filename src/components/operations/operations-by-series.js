import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import OperationList from './operation-list';
import D, { getLang } from 'i18n'
/**
 * Builds the query that retrieves the series of a given family.
 */
const queryBuilder = series => `
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?operation ?label
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${series}> dcterms:hasPart ?operation .
    ?operation skos:prefLabel ?label .
    FILTER(lang(?label) = '${getLang()}')
  }
  ORDER BY ?operation
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'operationsBySeries',
  params: ['series']
})

function OperationsBySeries({ operationsBySeries }) {
  if (operationsBySeries.length === 0) {
    return <span>{D.serieHoldsNoOperation}</span>
  }
  return <OperationList operations={operationsBySeries} />
}

export default connector(OperationsBySeries, {
  loading: () => <span>{D.loadingOperations}</span>
})
