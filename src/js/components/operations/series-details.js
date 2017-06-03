import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import OperationsBySeries from './operations-by-series';

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

function SeriesDetails({ series, label }) {
  return (
    <div>
      <h1>Série {label}</h1>
      <OperationsBySeries series={series} />
    </div>
  );
}

export default connector(SeriesDetails);
