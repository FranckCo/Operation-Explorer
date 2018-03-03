import React from 'react'
import { sparqlConnect } from 'sparql-connect'
import OrganizationList from './organization-list'
import { sortArrayByKey } from 'utils/sort-array'
import { getLang } from 'i18n'

const sortArray = sortArrayByKey('label');

const queryBuilder = () => `
  PREFIX insee: <http://rdf.insee.fr/def/base#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX org:<http://www.w3.org/ns/org#>
  SELECT ?organization ?label
  FROM <http://rdf.insee.fr/graphes/organisations>
  WHERE {
  	?organization a org:Organization ; skos:prefLabel ?label .
    FILTER (lang(?label) = '${getLang()}')
  }
  ORDER BY ?organization
`

export const connector = sparqlConnect(queryBuilder, {
  queryName: 'organizations'
})

function OrganizationExplorer({ organizations }) {

  return (
    <div>
      <OrganizationList organizations={sortArray(organizations)} />
    </div>
  )
}

export default connector(OrganizationExplorer, {
  loading: () => <span>Chargement de la liste des organisations</span>
})
