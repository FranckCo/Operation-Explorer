import React from 'react'
import { sparqlConnect } from 'sparql-connect'
import OperationList from './operation-list'
import { sortArrayByKey } from 'utils/sort-array'
import D, { getLang } from 'i18n'

const sortArray = sortArrayByKey('label');

const queryBuilder = () => `
  PREFIX insee: <http://rdf.insee.fr/def/base#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?operation ?label
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    ?operation a insee:StatisticalOperation ; skos:prefLabel ?label .
    FILTER(lang(?label) = '${getLang()}')
  }
  ORDER BY ?operation
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'operations'
})

function OperationExplorer({ operations }) {

  return (
    <div>
      <OperationList operations={sortArray(operations)} />
    </div>
  )
}

export default connector(OperationExplorer, {
  loading: () => <span>{D.loadingOperations}</span>
})
