import React from 'react';
import ReactTooltip from 'react-tooltip';
import { sparqlConnect } from 'sparql-connect';
import OperationsBySeries from './operations-by-series';
import ProductsByOperation from '../products/products-by-operation';
import NotFound from '../not-found'

import { operationTypes, periodicities } from '../lists';

/**
  * Builds the query that retrieves the details on a given operation series.
  */
const queryBuilder = series => `
  PREFIX insee: <http://rdf.insee.fr/def/base#>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?label ?abstract ?type ?casd ?periodicity
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${series}> skos:prefLabel ?label ; dcterms:abstract ?abstract ; insee:casdAvailable ?casd.
    FILTER (lang(?label) = 'fr')
    FILTER (lang(?abstract) = 'fr')
    OPTIONAL {<${series}> dcterms:type ?type}
    OPTIONAL {<${series}> dcterms:accrualPeriodicity ?periodicity}
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'seriesDetails',
  params: ['series'],
  singleResult: true
});

function SeriesDetails({ series, label, abstract, type, casd, periodicity }) {
  return (
    <div>
      <h1>Série {label}
        {(casd === 'true') &&
          <img className="casd-logo" data-tip="Disponible au CASD" src="/img/casd.png" />
        }
      </h1>
      <ReactTooltip />
      <h2>{abstract}</h2>
      <p className="label label-pill label-primary">{operationTypes[type.slice(-1)].fr}</p>
      <p className="label label-pill label-info">{periodicities[periodicity.split("/").pop()].fr}</p>
      <br />
      <OperationsBySeries series={series} />
      <ProductsByOperation operation={series} />
    </div>
  );
}

export default connector(SeriesDetails, {
  error: ({ series }) => <NotFound
    message={`The series ${series} were not found.`} />
});
