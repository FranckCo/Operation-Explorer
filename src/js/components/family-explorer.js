import React from 'react'
import { sparqlConnect, setPrefixes } from 'sparql-connect'
import FamilyList from './family-list'

setPrefixes({}) // Doesn't seem to work
/**
 * Builds the query that retrieves the list of families.
 */
const queryBuilder = () => `
  PREFIX insee: <http://rdf.insee.fr/def/base#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?family ?label
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    ?family a insee:StatisticalOperationFamily ; skos:prefLabel ?label .
  }
  ORDER BY ?family
`
const connector = sparqlConnect(queryBuilder, {
  queryName: 'families'
})

function FamilyExplorer({ families }) {
  return(
    <div>
      <FamiliList families={families}/>
    </div>
  )
}

export default connector(FamilyExplorer, {
  loading: () => <span>Loading family list</span>
})
