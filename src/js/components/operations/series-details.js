import React from 'react';
import ReactTooltip from 'react-tooltip';
import { sparqlConnect } from 'sparql-connect';
import OperationsBySeries from './operations-by-series';

/**
  * Builds the query that retrieves the details on a given operation series.
  */
const queryBuilder = series => `
  PREFIX insee: <http://rdf.insee.fr/def/base#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?label ?casd
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${series}> skos:prefLabel ?label ; insee:casdAvailable ?casd.
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'seriesDetails',
  params: ['series'],
  singleResult: true
});

function SeriesDetails({ series, label, casd }) {
  console.log(typeof casd);
  return (
    <div>
      <h1>Série {label}
        {(casd === 'true') &&
          <img className="casd-logo" data-tip="Disponible au CASD" src="/img/casd.png" />
        }
      </h1>
      <ReactTooltip />
      <OperationsBySeries series={series} />
    </div>
  );
}

export default connector(SeriesDetails);
