import { sparqlConnect } from 'sparql-connect'

/**
  * Builds the query that retrieves the periodicities.
  */
//HACK should not return anything (waiting for the information to be added to
//the database)
//TODO fix this when the database is updated
const queryBuilder = `
  PREFIX insee: <http://rdf.insee.fr/def/base#>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?periodicity ?fr ?en
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    ?periodicity a insee:nonExistingPredicatePeriodicity ;
    skos:prefLabel ?fr ;
    skos:prefLabel ?en .
	  FILTER (lang(?fr) = 'fr' && lang(?en) = 'fr')
  }
  LIMIT 1
`;

export default sparqlConnect(queryBuilder, {
  queryName: 'periodicities'
});
