import React from 'react';
import ReactTooltip from 'react-tooltip';
import { sparqlConnect, sparqlCombine } from 'sparql-connect';
import OperationsBySeries from './operations-by-series';
import ProductsByOperation from '../products/products-by-operation';
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
  { periodicity: 'PO', en: 'Punctual', fr: 'Ponctuelle' }
]


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
    <${series}> skos:prefLabel ?label .
    FILTER (lang(?label) = '${getLang()}') .
    OPTIONAL {<${series}> dcterms:abstract ?abstract .
    FILTER (lang(?abstract) = '${getLang()}')} .
    OPTIONAL {<${series}> insee:casdAvailable ?casd} .
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

function SeriesDetails({ series, label, abstract, type, casd, periodicity,
  operationTypes, periodicities }) {
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
      <h1>{D.serie} {label}
        {(casd === 'true') &&
          <img className="casd-logo" alt={D.availableFromCASD} data-tip={D.availableFromCASD} src="/img/casd.png" />
        }
      </h1>
      <ReactTooltip />
      <h2>{abstract}</h2>
      <p className="label label-pill label-primary">
        {operationTypesObj[type.slice(-1)].fr}
      </p>
      <p className="label label-pill label-info">
        {periodicitiesObj[periodicity.split("/").pop()].fr}
      </p>
      <br />
      <OperationsBySeries series={series} />
      <ProductsByOperation operation={series} />
    </div>
  );
}

export default connector(SeriesDetails, {
  error: ({ series }) => <NotFound
    message={D.seriesNotFound(series)} />
});
