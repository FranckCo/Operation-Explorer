import { sparqlConnect } from 'sparql-connect';
import { getLang } from 'i18n';

const queryBuilder = () => `
	PREFIX sdmx-mm: <http://www.w3.org/ns/sdmx-mm#>
	PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
	SELECT ?mas ?masLabel ?parent ?range ?presentational
	FROM <http://rdf.insee.fr/graphes/def/simsv2fr>
	WHERE {
    <http://id.insee.fr/qualite/simsv2fr/reportStructure> sdmx-mm:metadataAttributeSpecification ?mas .
    ?mas rdfs:label ?masLabel ; sdmx-mm:metadataAttributeProperty ?map .
		FILTER(lang(?masLabel) = '${getLang()}')
	  OPTIONAL {?mas sdmx-mm:parent ?parent }
	  OPTIONAL {?mas sdmx-mm:isPresentational ?presentational }
	  OPTIONAL {?map rdfs:range ?range }
	}
	ORDER BY ?mas
`;

export default sparqlConnect(queryBuilder, {
	queryName: 'simsStructure',
});
