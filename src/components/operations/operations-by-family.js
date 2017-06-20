import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import OperationList from './operation-list';

/**
 * Builds the query that retrieves the series of a given family.
 */
const queryBuilder = family => `
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?operation ?label
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${family}> dcterms:hasPart ?series .
    ?series dcterms:hasPart ?operation .
    ?operation skos:prefLabel ?label .
  }
  ORDER BY ?operation
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'operationsByFamily',
  params: ['family']
})

function OperationsByFamily({ operationsByFamily }) {
  if (operationsByFamily.length === 0) {
    return <span>Cette famille ne contient aucune opération</span>
  }
  return <OperationList operations={operationsByFamily} />
}

export default connector(OperationsByFamily, {
  loading: () => <span>Chargement de la liste des opérations</span>
})
