import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import SeriesByFamily from './series-by-family';
import OperationsByFamily from './operations-by-family';
import NotFound from '../not-found'
import D, { getLang } from 'i18n'
import { tidyString } from 'utils/string-utils'

/**
  * Builds the query that retrieves the details on a given operation family.
  */
const queryBuilder = family => `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  SELECT ?label ?abstract
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${family}> skos:prefLabel ?label .
    FILTER (lang(?label) = '${getLang()}') .
    OPTIONAL {<${family}> dcterms:abstract ?abstract .
    FILTER (lang(?abstract) = '${getLang()}')}
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
      <h1>{label}</h1>
      <h4>{tidyString(abstract)}</h4>
      <SeriesByFamily family={family} title={D.seriesByFamily}/>
      <OperationsByFamily family={family} title={D.operationsByFamily}/>
    </div>
  );
}

export default connector(FamilyDetails, {
  error: ({ family }) => <NotFound
    message={`The family ${family} was not found.`} />
});
