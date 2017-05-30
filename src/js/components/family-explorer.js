import React from 'react'
import { sparqlConnect } from 'sparql-connect'
import FamilyList from './family-list'

/**
 * Builds the query that retrieves the list of families.
 */
const queryBuilder = () => `
  SELECT ?family ?label
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
