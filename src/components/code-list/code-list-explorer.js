import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import NotFound from '../not-found'
import Spinner from 'components/shared/spinner'
import D, { getLang } from 'i18n'
/**
  * Builds the query that retrieves the details on a given code-list.
  */
const queryBuilder = codeList => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?label ?itemLabel
  FROM <http://rdf.insee.fr/graphes/codes>
  WHERE {
    <${codeList}> rdfs:label ?label .
    FILTER (lang(?label) = '${getLang()}') .
    ?item rdf:type <${codeList}> .
    ?item skos:prefLabel ?itemLabel .
    FILTER (lang(?itemLabel) = '${getLang()}') .
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'codeList',
  params: ['codeList'],
});

const CodeList = ({ codeList }) =>
  (
    <li>
      {`${D.codeList} : ${codeList[0].label}`}
      <ul>
        {codeList.map(({ itemLabel },i) => <li key={i}>{itemLabel}</li>)}
      </ul>
    </li>
  );

export default connector(CodeList, {
  error: ({ codeList }) => <NotFound
    message={D.codeListNotFound(codeList)} />,
  loading: () => <Spinner text={D.loadingCodeList}/>
});
