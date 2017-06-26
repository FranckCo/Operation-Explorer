import React from 'react'
import { sparqlConnect } from 'sparql-connect'
import OperationList from './operation-list'
import D from 'i18n'

const queryBuilder = () => `
  PREFIX insee: <http://rdf.insee.fr/def/base#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?operation ?label
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    ?operation a insee:StatisticalOperation ; skos:prefLabel ?label .
  }
  ORDER BY ?operation
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'operations'
})

function OperationExplorer({ operations }) {

  return (
    <div>
      <OperationList operations={operations} />
    </div>
  )
}

export default connector(OperationExplorer, {
  loading: () => <span>{D.loadingOperations}</span>
})
