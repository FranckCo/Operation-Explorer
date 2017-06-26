import React from 'react';
import { Link } from 'react-router-dom';
import { sparqlConnect } from 'sparql-connect';
import { operationLink, seriesLink } from '../operations/routes';
import NotFound from '../not-found'
import D from 'i18n'

/**
  * Builds the query that retrieves the details on a given product.
  */
const queryBuilder = product => `
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX prov: <http://www.w3.org/ns/prov#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX insee: <http://rdf.insee.fr/def/base#>
  SELECT ?name ?series ?seriesName ?operation ?operationName
  FROM <http://rdf.casd.eu/graphes/produits>
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${product}> dcterms:title ?name ; prov:wasGeneratedBy ?series .
    ?series a insee:StatisticalOperationSeries ; skos:prefLabel ?seriesName .
    FILTER (lang(?name) = "fr")
    FILTER (lang(?seriesName) = "fr")
    OPTIONAL {
      <${product}> prov:wasGeneratedBy ?operation .
      ?operation a insee:StatisticalOperation ; skos:prefLabel ?operationName .
      FILTER (lang(?operationName) = "fr")
    }
  }
`;

const connector = sparqlConnect(queryBuilder, {
  queryName: 'productDetails',
  params: ['product'],
  singleResult: true
});

function ProductDetails({ product, name, series, seriesName, operation, operationName }) {
  return (
    <div>
      <h1>Produit {name} </h1>
      <h2>{D.fromSerie} <Link to={seriesLink(series)}>{seriesName}</Link></h2>
      {(operation) &&
        <h3>{D.fromOperation} <Link to={operationLink(operation)}>{operationName}</Link></h3>
      }
    </div>
  );
}

export default connector(ProductDetails, {
  error: ({ product }) => <NotFound
    message={`The product ${product} was not found.`} />
});
