import React from 'react';
import ReactTooltip from 'react-tooltip';
import { sparqlConnect, sparqlCombine } from 'sparql-connect';
import OperationsBySeries from './operations-by-series';
import ProductsByOperation from '../products/products-by-operation';
import NotFound from '../not-found'

import operationTypesConnector from '../connectors/operation-types';
import periodicitiesConnector from '../connectors/periodicities'

const operationTypes_ = {
  "S": { "en": "Survey", "fr": "Enquête" },
  "A": { "en": "Administrative data", "fr": "Données administratives" },
  "C": { "en": "Synthesis", "fr": "Synthèse" },
  "I": { "en": "Indicators", "fr": "Indicateurs" },
  "P": { "en": "Panel", "fr": "Panel" },
  "M": { "en": "Modelization", "fr": "Modélisation" }
}

const periodicities_ = {
  "A": { "en": "Annual", "fr": "Annuelle" },
  "P": { "en": "Aperiodic", "fr": "Apériodique" },
  "C": { "en": "Continuous", "fr": "En continu" },
  "M": { "en": "Monthly", "fr": "Annuelle" },
  "Q": { "en": "Quarterly", "fr": "Trimestrielle" },
  "S": { "en": "Biannual", "fr": "Semestrielle" },
  "PA": { "en": "Multiannual", "fr": "Multiannuelle" },
  "PO": { "en": "Punctual", "fr": "Ponctuelle" }
}

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
  return (
    <div>
      <h1>Série {label}
        {(casd === 'true') &&
          <img className="casd-logo" data-tip="Disponible au CASD" src="/img/casd.png" />
        }
      </h1>
      <ReactTooltip />
      <h2>{abstract}</h2>
      <p className="label label-pill label-primary">{operationTypes_[type.slice(-1)].fr}</p>
      <p className="label label-pill label-info">{periodicities_[periodicity.split("/").pop()].fr}</p>
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
