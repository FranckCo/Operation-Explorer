import React from 'react'
import { sparqlConnect } from 'sparql-connect'
import OrganizationList from './organization-list'

const queryBuilder = () => `
  PREFIX insee: <http://rdf.insee.fr/def/base#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX org:<http://www.w3.org/ns/org#>
  SELECT ?organization ?name
  FROM <http://rdf.insee.fr/graphes/organisations>
  WHERE {
  	?organization a org:Organization ; skos:prefLabel ?name .
    FILTER (lang(?name) = 'fr')
  }
  ORDER BY ?organization
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'organizations'
})

function OrganizationExplorer({ organizations }) {

  return(
    <div>
      <OrganizationList organizations={organizations}/>
    </div>
  )
}

export default connector(OrganizationExplorer, {
  loading: () => <span>Chargement de la liste des organisations</span>
})
