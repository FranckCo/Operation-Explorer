import React from 'react';
import { Link } from 'react-router';
import { sparqlConnect } from 'sparql-connect';

/**
  * Builds the query that retrieves the details on a given organization.
  */
const queryBuilder = operation => `
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX org: <http://www.w3.org/ns/org#>
  SELECT ?label ?seeAlso ?mother
  FROM <http://rdf.insee.fr/graphes/organisations>
  WHERE {
    <${operation}> skos:prefLabel ?label .
    FILTER (lang(?label) = 'fr')
    OPTIONAL { <${operation}> rdfs:seeAlso ?seeAlso . }
    OPTIONAL { <${operation}> org:unitOf ?mother . }
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'organizationDetails',
  params: ['organization'],
  singleResult: true
});

function OrganizationDetails({ label, seeAlso, mother }) {
  console.log(mother);
  return (
    <div>
      <h1>Organisation {label}</h1>
      <p>Voir :&nsbp;
        <a href={seeAlso}>site web</a>
      </p>
      {mother && <p>{mother}</p>}
    </div>
  );
}

export default connector(OrganizationDetails);
