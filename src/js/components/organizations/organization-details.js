import React from 'react';
import { sparqlConnect } from 'sparql-connect';

/**
  * Builds the query that retrieves the details on a given organization.
  */
const queryBuilder = operation => `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?label
  FROM <http://rdf.insee.fr/graphes/organisations>
  WHERE {
    <${operation}> skos:prefLabel ?label .
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'organizationDetails',
  params: ['organization'],
  singleResult: true
});

function OrganizationDetails({ label }) {
  return (
    <div>
      <h1>Organisation {label}</h1>
    </div>
  );
}

export default connector(OrganizationDetails);
