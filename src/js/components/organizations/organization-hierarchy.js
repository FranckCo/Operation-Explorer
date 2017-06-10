import React from 'react';
import { Link } from 'react-router';
import { sparqlConnect } from 'sparql-connect';

/**
  * Builds the query that retrieves the hierarchy of a given organization.
  */
const queryBuilder = organization => `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX org: <http://www.w3.org/ns/org#>
  SELECT ?daughter ?mother ?type ?name
  FROM <http://rdf.insee.fr/graphes/organisations>
  WHERE {
	  { ?mother org:hasUnit <${organization}> ; skos:prefLabel ?name .
        FILTER (lang(?name) = "fr") BIND ("H" AS ?type)}
	  UNION { ?mother org:linkedTo <${organization}> ; skos:prefLabel ?name .
        FILTER (lang(?name) = "fr") BIND ("F" AS ?type)}
	  UNION { ?daughter org:unitOf <${organization}> ; skos:prefLabel ?name .
        FILTER (lang(?name) = "fr") BIND ("H" AS ?type)}
	  UNION { ?daughter org:reportsTo <${organization}> ; skos:prefLabel ?name .
        FILTER (lang(?name) = "fr") BIND ("F" AS ?type)}
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'organizationHierarchy',
  params: ['organization'],
  singleResult: false
});

function OrganizationHierarchy({ organizationHierarchy }) {
  console.log(organizationHierarchy);
  if (organizationHierarchy.length === 0) {
    return <span>Aucune information sur la hiérarchie de cette organisation</span>
  }
  return (
    <div>
      <h2>Hiérachie ici</h2>
    </div>
  );
}

export default connector(OrganizationHierarchy);
