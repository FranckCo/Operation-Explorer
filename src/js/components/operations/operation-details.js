import React from 'react';
import { sparqlConnect } from 'sparql-connect';

/**
  * Builds the query that retrieves the details on a given operation.
  */
const queryBuilder = operation => `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  SELECT ?label ?abstract
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${operation}> skos:prefLabel ?label ; dcterms:abstract ?abstract .
    FILTER (lang(?label) = 'fr')
    FILTER (lang(?abstract) = 'fr')
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'operationDetails',
  params: ['operation'],
  singleResult: true
});

function OperationDetails({ label , abstract}) {
  return (
    <div>
      <h1>Opération {label}</h1>
      <h2>{abstract}</h2>
    </div>
  );
}

export default connector(OperationDetails);
