import React from 'react'
import { sparqlConnect, setPrefixes } from 'sparql-connect'
import FamilyList from './family-list'
import Spinner from 'components/shared/spinner'
import D, { getLang } from 'i18n'

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
    FILTER(lang(?label) = '${getLang()}')
  }
  ORDER BY ?family
`
const connector = sparqlConnect(queryBuilder, {
  queryName: 'families'
})

function FamilyExplorer({ families }) {
  return(
    <div>
      <FamilyList families={families}/>
    </div>
  )
}

export default connector(FamilyExplorer, {
  loading: () => <Spinner text={D.loadingFamillies}/>
})
