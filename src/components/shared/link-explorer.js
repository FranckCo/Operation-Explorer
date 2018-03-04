import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import LinkList from './link-list';
import * as L from './type-of-link';
import { getLang } from 'i18n';

/**
 * Builds the query that retrieves the products issued of a given ressource.
 */
const queryBuilder = resource => `
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX prov: <http://www.w3.org/ns/prov#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT ?outResource ?label ?typeOfLink ?type
  FROM <http://rdf.insee.fr/graphes/operations>
  FROM <http://rdf.insee.fr/graphes/produits>
  WHERE {
    {<${resource}> dcterms:replaces ?outResource.
    ?outResource a ?type .
    ?outResource skos:prefLabel ?label .
    FILTER (lang(?label) = '${getLang()}')
    BIND('${L.IS_REPLACED}' AS ?typeOfLink)}
    UNION
    {<${resource}> dcterms:isReplacedBy ?outResource.
    ?outResource skos:prefLabel ?label .
    ?outResource a ?type .
    FILTER (lang(?label) = '${getLang()}')
    BIND('${L.REPLACES}' AS ?typeOfLink)}
    UNION
    {<${resource}> rdfs:seeAlso ?outResource.
    ?outResource skos:prefLabel ?label .
    ?outResource a ?type .
    FILTER (lang(?label) = '${getLang()}')
    BIND('${L.SEE_ALSO}' AS ?typeOfLink)}
  }
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'linkedResources',
	params: ['resource'],
});

function LinkedResources({ linkedResources }) {
	if (linkedResources.length === 0) {
		return <span />;
	}
	return <LinkList resources={linkedResources} />;
}

export default connector(LinkedResources, {
	loading: () => <span>Chargement des ressources liées</span>,
});
