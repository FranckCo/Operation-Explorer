import React from 'react';
import { sparqlConnect } from 'sparql-connect';

/**
  * Builds the query that retrieves the details on a given operation series.
  */
const queryBuilder = series => `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?label
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${series}> skos:prefLabel ?label .
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'seriesDetails',
  params: ['series'],
  singleResult: true
});

function SeriesDetails({ label }) {
  return (
    <div>
      Série
      <h1>{label}</h1>
    </div>
  );
}

export default connector(SeriesDetails);
