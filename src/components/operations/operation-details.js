import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import NotFound from '../not-found'
import D, { getLang } from 'i18n'
/**
  * Builds the query that retrieves the details on a given operation.
  */
const queryBuilder = operation => `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  SELECT ?label ?altLabel ?valid ?abstract
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${operation}> skos:prefLabel ?label .
    FILTER (lang(?label) = '${getLang()}')
    OPTIONAL {<${operation}> skos:altLabel ?altLabel} .
    OPTIONAL {<${operation}> dcterms:valid ?valid} .
    OPTIONAL {<${operation}> dcterms:abstract ?abstract .
    FILTER (lang(?abstract) = '${getLang()}')}
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'operationDetails',
  params: ['operation'],
  singleResult: true
});

function OperationDetails({ label, altLabel, valid, abstract }) {
  return (
    <div>
      <h1>{label}</h1>
      <h2>{altLabel}</h2>
      {valid && <p className="validFor">{D.validFor} {valid}</p>}
      <p className="abstract">{abstract}</p>
    </div>
  );
}

export default connector(OperationDetails, {
  error: ({ operation }) => <NotFound
    message={D.operationNotFound(operation)} />
});
