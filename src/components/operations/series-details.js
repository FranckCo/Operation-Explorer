import React from 'react';
import ReactTooltip from 'react-tooltip';
import { sparqlConnect } from 'sparql-connect';
import OperationsBySeries from './operations-by-series';
import { operationTypes } from '../lists';

/**
  * Builds the query that retrieves the details on a given operation series.
  */
const queryBuilder = series => `
  PREFIX insee: <http://rdf.insee.fr/def/base#>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?label ?abstract ?type ?casd
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${series}> skos:prefLabel ?label ; dcterms:abstract ?abstract ; insee:casdAvailable ?casd.
    FILTER (lang(?label) = 'fr')
    FILTER (lang(?abstract) = 'fr')
    OPTIONAL {<${series}> dcterms:type ?type}
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'seriesDetails',
  params: ['series'],
  singleResult: true
});

function SeriesDetails({ series, label, abstract, type, casd }) {
  return (
    <div>
      <h1>Série {label}
        {(casd === 'true') &&
          <img className="casd-logo" data-tip="Disponible au CASD" src="/img/casd.png" />
        }
      </h1>
      <ReactTooltip />
      <h2>{abstract}</h2>
      <p className="badge">{operationTypes[type.slice(-1)].fr}</p>
      <br/>
      <OperationsBySeries series={series} />
    </div>
  );
}

export default connector(SeriesDetails);
