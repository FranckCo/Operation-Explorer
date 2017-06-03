import React from 'react';
import { sparqlConnect } from 'sparql-connect';

/**
  * Builds the query that retrieves the details on a given operation.
  */
const queryBuilder = operation => `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?label
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${operation}> skos:prefLabel ?label .
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'operationDetails',
  params: ['operation'],
  singleResult: true
});

function OperationDetails({ label }) {
  return (
    <div>
      <h1>Opération {label}</h1>
    </div>
  );
}

export default connector(OperationDetails);
