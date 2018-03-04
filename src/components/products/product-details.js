import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import SeriesByProduct from '../operations/series-by-product';
import NotFound from '../not-found'
import { tidyString } from 'utils/string-utils'
import D, { getLang} from 'i18n'

/**
  * Builds the query that retrieves the details on a given product.
  */
const queryBuilder = product => `
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?label ?abstract ?historyNote
  FROM <http://rdf.insee.fr/graphes/produits>
  WHERE {
    <${product}> skos:prefLabel ?label .
    FILTER (lang(?label) = '${getLang()}')
    OPTIONAL {<${product}> dcterms:abstract ?abstract .
    FILTER (lang(?abstract) = '${getLang()}')} .
    OPTIONAL {<${product}> skos:historyNote ?historyNote .
    FILTER (lang(?historyNote) = '${getLang()}')} .
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'productDetails',
  params: ['product'],
  singleResult: true
});

function ProductDetails({ product, label, abstract, historyNote }) {
  return (
    <div>
      <h1>{label} </h1>
      <div className="abstract">{tidyString(abstract)}</div>
      {historyNote && <p className="historyNote-title">{D.historyNote}</p>}
      <div className="historyNote">{tidyString(historyNote)}</div>
      <SeriesByProduct product={product} />
    </div>
  );
}

export default connector(ProductDetails, {
  error: ({ product }) => <NotFound
    message={`The product ${product} was not found.`} />
});
