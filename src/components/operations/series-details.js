import React from 'react';
import ReactTooltip from 'react-tooltip';
import { sparqlConnect, sparqlCombine } from 'sparql-connect';
import OperationsBySeries from './operations-by-series';
import ProductsBySeries from '../products/products-by-series';
import NotFound from '../not-found'
import arrayToObject from '../../utils/array-to-object'
import operationTypesConnector from '../connectors/operation-types';
import periodicitiesConnector from '../connectors/periodicities'
import D, { getLang } from 'i18n'

//HACK waiting for the database to be updated with real information
//TODO fix this when the database is updated
const failSafeOperationTypes = [
  { type: 'S', 'en': 'Survey', fr: 'Enquête' },
  { type: 'A', 'en': 'Administrative data', fr: 'Données administratives' },
  { type: 'C', 'en': 'Synthesis', fr: 'Synthèse' },
  { type: 'I', 'en': 'Indicators', fr: 'Indicateurs' },
  { type: 'P', 'en': 'Panel', fr: 'Panel' },
  { type: 'M', 'en': 'Modelization', fr: 'Modélisation' }
]

const failSafePeriodicities = [
  { periodicity: 'A', en: 'Annual', fr: 'Annuelle' },
  { periodicity: 'P', en: 'Aperiodic', fr: 'Apériodique' },
  { periodicity: 'C', en: 'Continuous', fr: 'En continu' },
  { periodicity: 'M', en: 'Monthly', fr: 'Annuelle' },
  { periodicity: 'Q', en: 'Quarterly', fr: 'Trimestrielle' },
  { periodicity: 'S', en: 'Biannual', fr: 'Semestrielle' },
  { periodicity: 'PA', en: 'Multiannual', fr: 'Multiannuelle' },
  { periodicity: 'PO', en: 'Punctual', fr: 'Ponctuelle' },
  { periodicity: 'T', en: 'Bimonthly', fr: 'Bimestrielle' }
]


/**
  * Builds the query that retrieves the details on a given operation series.
  */
// OPTIONAL {<${series}> insee:casdAvailable ?casd} .
const queryBuilder = series => `
  PREFIX insee: <http://rdf.insee.fr/def/base#>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?label ?altLabel ?abstract ?historyNote ?type ?periodicity
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${series}> skos:prefLabel ?label .
    FILTER (lang(?label) = '${getLang()}') .
    OPTIONAL {<${series}> skos:altLabel ?altLabel} .
    OPTIONAL {<${series}> dcterms:abstract ?abstract .
    FILTER (lang(?abstract) = '${getLang()}')} .
    OPTIONAL {<${series}> skos:historyNote ?historyNote .
    FILTER (lang(?historyNote) = '${getLang()}')} .
    OPTIONAL {<${series}> dcterms:type ?type} .
    OPTIONAL {<${series}> dcterms:accrualPeriodicity ?periodicity}
  }
`;

const seriesDetailsConnector = sparqlConnect(queryBuilder, {
  queryName: 'seriesDetails',
  params: ['series'],
  singleResult: true
});

const connector = sparqlCombine(
  operationTypesConnector,
  periodicitiesConnector,
  seriesDetailsConnector
)

function SeriesDetails({ series, label, altLabel, abstract, historyNote,
  type, casd, periodicity, operationTypes, periodicities }) {
  //TODO remove reference to fail save entries when retrieving this information
  //from the database is functional
  operationTypes = operationTypes.length > 0 ?
    operationTypes : failSafeOperationTypes;
  periodicities = periodicities.length > 0 ?
    periodicities : failSafePeriodicities;

  const operationTypesObj = arrayToObject(operationTypes, 'type')
  const periodicitiesObj = arrayToObject(periodicities, 'periodicity')
  return (
    <div>
      <h1>{label}
        {/*(casd === 'true') &&
          <img className="casd-logo" alt={D.availableFromCASD} data-tip={D.availableFromCASD} src="/img/casd.png" />
        */}
      </h1>
      <h2>{altLabel}</h2>
      <ReactTooltip />
      <p className="abstract">{abstract}</p>
      {historyNote && <p className="historyNote-title">{D.historyNote}</p>}
      <p className="historyNote">{historyNote}</p>
      <p className="label label-pill label-primary">
        {type && operationTypesObj[type.slice(-1)].fr}
      </p>
      <p className="label label-pill label-info">
        {periodicity && periodicitiesObj[periodicity.split("/").pop()].fr}
      </p>
      <br />
      <OperationsBySeries series={series} />
      <ProductsBySeries series={series} />
    </div>
  );
}

export default connector(SeriesDetails, {
  error: ({ series }) => <NotFound
    message={D.seriesNotFound(series)} />
});
