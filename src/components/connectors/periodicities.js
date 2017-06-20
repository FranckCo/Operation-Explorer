import { sparqlConnect } from 'sparql-connect'

/**
  * Builds the query that retrieves the periodicities.
  */
const queryBuilder = `
  PREFIX insee: <http://rdf.insee.fr/def/base#>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?s ?p ?o
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE { ?s ?p ?o }
  LIMIT 1
`;

export default sparqlConnect(queryBuilder, {
  queryName: 'periodicities'
});
