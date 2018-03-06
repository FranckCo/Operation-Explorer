import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import OrganizationList from './organization-list';
import Spinner from 'components/shared/spinner'
import D from 'i18n'

/**
 * Builds the query that retrieves the products issued of a given series.
 */
 // TODO Return label by lang (needs traduction before)
const queryBuilder = series => `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  SELECT ?organization ?label ?typeOfLink
  FROM <http://rdf.insee.fr/graphes/operations>
  FROM <http://rdf.insee.fr/graphes/organisations>
  WHERE {
    {<${series}> dcterms:creator ?organization .
    ?organization skos:prefLabel ?label .
    FILTER (lang(?label) = 'fr')
    BIND('creator' AS ?typeOfLink)}
    UNION
    {<${series}> dcterms:contributor ?organization .
    ?organization skos:prefLabel ?label .
    FILTER (lang(?label) = 'fr')
    BIND('contributor' AS ?typeOfLink)}
  }
  ORDER BY ?organization
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'organizationsBySeries',
  params: ['series']
})

function OrganizationsBySeries({ organizationsBySeries, titleCreator, titleContributor }) {
  console.log(organizationsBySeries)
  if (organizationsBySeries.length === 0) {
    return <span />;
  }
  const orgaCreator = organizationsBySeries.filter(o => o.typeOfLink === 'creator');
  const orgaContributor = organizationsBySeries.filter(o => o.typeOfLink === 'contributor')
  return (
    <span>
      {orgaCreator.length > 0 && <OrganizationList
        organizations={orgaCreator}
        title={titleCreator}/>}
      {orgaContributor.length > 0 && <OrganizationList
        organizations={orgaContributor}
        title={titleContributor}/>}
    </span>)
}

export default connector(OrganizationsBySeries, {
  loading: () => <Spinner text={D.loadingOrganizations}/>
})
