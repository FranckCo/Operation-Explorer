import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import SeriesByFamily from './series-by-family';

/**
  * Builds the query that retrieves the details on a given operation family.
  */
const queryBuilder = family => `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?label
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${family}> skos:prefLabel ?label .
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'familyDetails',
  params: ['family'],
  singleResult: true
});

function FamilyDetails({family, label }) {
  return (
    <div>
      {family}
      <h1>Famille {label}</h1>
      <SeriesByFamily family={family} />
    </div>
  );
}

export default connector(FamilyDetails);
