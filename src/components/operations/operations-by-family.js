import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import OperationList from './operation-list';
import Spinner from 'components/shared/spinner'
import D, { getLang } from 'i18n';

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
    FILTER(lang(?label) = '${getLang()}')
  }
  ORDER BY ?operation
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'operationsByFamily',
  params: ['family']
})

function OperationsByFamily({ operationsByFamily, title }) {
  if (operationsByFamily.length === 0) {
    return <div>{D.familyHoldsNoOperation}</div>
  }
  return <OperationList operations={operationsByFamily} title={title} />
}

export default connector(OperationsByFamily, {
  loading: () => <Spinner text={D.loadingOperations}/>
})
