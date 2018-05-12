import { sparqlConnect } from 'sparql-connect';
import { getLang } from 'i18n';

const queryBuilder = () => `
    PREFIX  skos: <http://www.w3.org/2004/02/skos/core#>

    SELECT DISTINCT ?codeListURI ?codeURI ?label
     FROM <http://rdf.insee.fr/graphes/codes>
     WHERE {
        ?codeListURI a skos:ConceptScheme ;
                skos:hasTopConcept ?codeURI .
        ?codeURI skos:prefLabel ?label .
        FILTER(lang(?label) = '${getLang()}')
     }
    ORDER BY ?codeListURI ?codeURI
`;

export default sparqlConnect(queryBuilder, {
	queryName: 'codes',
});
