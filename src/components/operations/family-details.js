import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import SeriesByFamily from './series-by-family';
import OperationsByFamily from './operations-by-family';
import NotFound from '../not-found'
import D from 'i18n'

/**
  * Builds the query that retrieves the details on a given operation family.
  */
const queryBuilder = family => `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  SELECT ?label ?abstract
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${family}> skos:prefLabel ?label ; dcterms:abstract ?abstract .
    FILTER (lang(?label) = 'fr')
    FILTER (lang(?abstract) = 'fr')
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'familyDetails',
  params: ['family'],
  singleResult: true
});

function FamilyDetails({ family, label, abstract }) {
  return (
    <div>
      <h1>{D.family} {label}</h1>
      <h2>{abstract}</h2>
      <SeriesByFamily family={family} />
      <OperationsByFamily family={family} />
    </div>
  );
}

export default connector(FamilyDetails, {
  error: ({ family }) => <NotFound
    message={`The family ${family} was not found.`} />
});
