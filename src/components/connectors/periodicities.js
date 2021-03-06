import { sparqlConnect } from 'sparql-connect'

/**
  * Builds the query that retrieves the periodicities.
  */
//HACK should not return anything (waiting for the information to be added to
//the database)
//TODO fix this when the database is updated
const queryBuilder = `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?periodicity ?fr ?en
  FROM <http://rdf.insee.fr/graphes/codes>
  WHERE {
    ?periodicity a skos:Concept ;
    skos:inScheme <http://id.insee.fr/codes/frequences>;
    skos:prefLabel ?fr ;
    skos:prefLabel ?en .
	  FILTER (lang(?fr) = 'fr' && lang(?en) = 'en')
  }
`;

export default sparqlConnect(queryBuilder, {
  queryName: 'periodicities'
});
