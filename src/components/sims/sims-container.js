import React from 'react';
import { sparqlConnect, sparqlCombine } from 'sparql-connect';
import SimsDetails from './sims';
import simsStructure from 'components/connectors/sims-structure';
import NotFound from '../not-found';
import Spinner from 'components/shared/spinner';
import D, { getLang } from 'i18n';
import { DATE, RICH_TEXT } from 'utils/constants';
/**
 * Builds the query that retrieves the details on sims structure.
 */
const queryBuilder = sims => `
	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
	PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
	PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
	SELECT ?label ?attr ?type ?date ?note
	FROM <http://rdf.insee.fr/graphes/qualite/rapport/${sims.slice(
		sims.lastIndexOf('/') + 1
	)}>
	WHERE {
		{
			<${sims}> rdfs:label ?label .
    	FILTER (lang(?label) = '${getLang()}') .
		}
		UNION
		{
			<${sims}> ?attr ?date .
			FILTER ( datatype(?date) = xsd:date )
			BIND ("${DATE}" as ?type)
		}
		UNION
		{
			<${sims}> ?attr ?ExpNote .
			?ExpNote rdf:value ?note
			BIND ("${RICH_TEXT}" as ?type)
		}
	}
`;

const simsReportConnector = sparqlConnect(queryBuilder, {
	queryName: 'simsReport',
	params: ['sims'],
});

const connector = sparqlCombine(simsReportConnector, simsStructure);

const SimsExplorer = ({ simsStructure, simsReport }) => (
	<SimsDetails simsStructure={simsStructure} simsReport={simsReport} />
);

export default connector(SimsExplorer, {
	error: () => <NotFound message={D.simsNotFound} />,
	loading: () => <Spinner text={D.loadingASims} />,
});
