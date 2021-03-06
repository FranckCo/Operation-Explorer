import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { sparqlConnect, sparqlCombine } from 'sparql-connect';
import OperationsBySeries from './operations-by-series';
import ProductsBySeries from '../products/products-by-series';
import LinkedResources from '../shared/link-explorer'
import SimsBySeries from '../sims/sims-by-series'
import OrganizationsBySeries from '../organizations/organizations-by-series'
import NotFound from '../not-found'
import Spinner from 'components/shared/spinner'
import arrayToObject from '../../utils/array-to-object'
import operationTypesConnector from '../connectors/operation-types';
import periodicitiesConnector from '../connectors/periodicities'
import { familyLink } from './routes';
import D, { getLang } from 'i18n'
import { tidyString } from 'utils/string-utils'
import 'css/style.css';

/**
  * Builds the query that retrieves the details on a given operation series.
  */
// OPTIONAL {<${series}> insee:casdAvailable ?casd} .
const queryBuilder = series => `
  PREFIX insee: <http://rdf.insee.fr/def/base#>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?label ?motherFamily ?motherFamilyLabel ?altLabel ?abstract ?historyNote ?type ?periodicity
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${series}> skos:prefLabel ?label .
    FILTER (lang(?label) = '${getLang()}') .
    ?motherFamily dcterms:hasPart <${series}> .
    ?motherFamily skos:prefLabel ?motherFamilyLabel .
    FILTER (lang(?motherFamilyLabel) = '${getLang()}') .
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

function SeriesDetails({ series, label, motherFamily, motherFamilyLabel, altLabel,
  abstract, historyNote, type, casd, periodicity, operationTypes, periodicities }) {
    
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
      {motherFamily && <h4>{D.motherFamily}{' : '}
        <Link to={familyLink(motherFamily)}>
          {motherFamilyLabel}
        </Link>
      </h4>}
      {type && <p className="label label-pill label-primary">
        {operationTypesObj[type][getLang()]}
      </p>}
      {periodicity && <p className="label label-pill label-info">
        {periodicitiesObj[periodicity][getLang()]}
      </p>}
      <ReactTooltip />
      <div className="abstract">{tidyString(abstract)}</div>
      {historyNote && <p className="rubric-title">{D.historyNote}</p>}
      <div className="historyNote">{tidyString(historyNote)}</div>
      <SimsBySeries series={series} title={D.simsBySeries} />
      <OperationsBySeries series={series} title={D.operationsBySeries} />
      <ProductsBySeries series={series} title={D.productsBySeries} />
      <LinkedResources resource={series} />
      <OrganizationsBySeries
        series={series}
        titleCreator={D.titleCreator}
        titleContributor={D.titleContributor}
      />
    </div>
  );
}

export default connector(SeriesDetails, {
  error: ({ series }) => <NotFound
    message={D.seriesNotFound(series)} />,
  loading: () => <Spinner text={D.loadingASeries}/>
});
