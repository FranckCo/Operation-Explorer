import React from 'react';
import { sparqlConnect, sparqlCombine } from 'sparql-connect';
import SimsDetails from './sims';
import simsStructure from 'components/connectors/sims-structure';
import codes from 'components/connectors/codes';
import NotFound from '../not-found';
import Spinner from 'components/shared/spinner';
import D, { getLang } from 'i18n';
import config from 'config';
import * as T from 'utils/constants';
/**
 * Builds the query that retrieves the details on sims structure.
 */
const queryBuilder = sims => `
	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
	PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
	PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
	PREFIX sdmx-mm: <http://www.w3.org/ns/sdmx-mm#>
	PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

	SELECT ?title ?target ?attr ?type ?date ?note ?code
	FROM <http://rdf.insee.fr/graphes/qualite/rapport/${sims.slice(
		sims.lastIndexOf('/') + 1
	)}>
	FROM <http://rdf.insee.fr/graphes/operations>
	WHERE {
		{
			<${sims}> rdfs:label ?title .
    	FILTER (lang(?title) = '${getLang()}') .
		}
		UNION
		{
			<${sims}> sdmx-mm:target ?target .
		}
		UNION
		{
			<${sims}> ?attr ?date .
			FILTER ( datatype(?date) = xsd:date )
			BIND ("${T.DATE}" as ?type)
		}
		UNION
		{
			<${sims}> ?attr ?ExpNote .
			?ExpNote rdf:value ?note
			BIND ("${T.RICH_TEXT}" as ?type)
		}
		UNION
		{
			<${sims}> ?attr ?code .
			FILTER ( REGEX(STR(?code), '${config.baseHost}/codes/'))
			BIND ("${T.CODE}" as ?type)
		}
	}
`;

const simsReportConnector = sparqlConnect(queryBuilder, {
	queryName: 'simsReport',
	params: ['sims'],
});

const connector = sparqlCombine(simsReportConnector, simsStructure, codes);

const SimsContainer = ({ simsStructure, simsReport, codes }) => (
	<SimsDetails
		simsStructure={simsStructure}
		simsReport={simsReport}
		codes={codes}
	/>
);

export default connector(SimsContainer, {
	error: () => <NotFound message={D.simsNotFound} />,
	loading: () => <Spinner text={D.loadingASims} />,
});
