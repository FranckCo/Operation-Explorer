import React from 'react'
import { sparqlConnect } from 'sparql-connect';
import NotFound from 'components/not-found'
import Spinner from 'components/shared/spinner'
import CodeList from 'components/code-list'
import { getRangeLabel } from 'utils/range'
import D, { getLang } from 'i18n'
/**
  * Builds the query that retrieves the details on a given mas.
  */
const queryBuilder = masId => `
  PREFIX sdmx-mm: <http://www.w3.org/ns/sdmx-mm#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?masLabelFr ?masLabelEn ?range ?isPresentational ?codeListCS
  FROM <http://rdf.insee.fr/graphes/def/simsv2fr>
  FROM <http://rdf.insee.fr/graphes/codes>
  WHERE {
    ?mas rdfs:label ?masLabelFr ;
      rdfs:label ?masLabelEn ;
      sdmx-mm:metadataAttributeProperty ?map .
    FILTER(STRENDS(STR(?mas), '/${masId}'))
    FILTER(lang(?masLabelFr) = 'fr')
    FILTER(lang(?masLabelEn) = 'en')
    OPTIONAL {?mas sdmx-mm:isPresentational ?isPresentational }
    OPTIONAL {?map rdfs:range ?range }
    OPTIONAL {?range rdfs:seeAlso ?codeListCS .
      ?codeListCS rdf:type skos:ConceptScheme}
  }
  ORDER BY ?mas
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'masDetails',
  params: ['masId'],
  singleResult: true
});

const MasDetails = ({ masLabelFr, masLabelEn, range, isPresentational, codeListCS })  =>
    (
      <div>
        <h3 className="centered">
          {getLang() === 'fr' ? masLabelFr : masLabelEn}
        </h3>
        <ul>
          {getLang() === 'en' && <li>{`${D.labelFr} : ${masLabelFr}`}</li>}
          {getLang() === 'fr' && <li>{`${D.labelEn} : ${masLabelEn}`}</li>}
          <li>{`${D.presentational} : ${isPresentational ? D.yes : D.no}`}</li>
          <li>{`${D.range} : ${getRangeLabel(range, codeListCS)}`}</li>
          {codeListCS && <CodeList codeList={range} />}
        </ul>
      </div>
  );


export default connector(MasDetails, {
  error: ({ masId }) => <NotFound
    message={D.masIdNotFound(masId)} />,
  loading: () => <Spinner text={D.loadingMas}/>
});
