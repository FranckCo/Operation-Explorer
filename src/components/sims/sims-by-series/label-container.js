import React from 'react';
import { Link } from 'react-router-dom';
import { sparqlConnect } from 'sparql-connect';
import Spinner from 'components/shared/spinner';
import { simsLink } from '../routes';
import D, { getLang } from 'i18n';

/**
 * Builds the query that retrieves the products issued of a given series.
 */
const queryBuilder = simsURI => `
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT ?simsLabel
  FROM <http://rdf.insee.fr/graphes/qualite/rapport/${simsURI.slice(
		simsURI.lastIndexOf('/') + 1
	)}>
  WHERE {
    ?simsURI rdfs:label ?simsLabel .
    FILTER (lang(?simsLabel) = '${getLang()}')
  }
  ORDER BY ?simsLabel
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'simsLabelBySeries',
	params: ['simsURI'],
	singleResult: true,
});

function SimsLabelBySeries({ simsURI, simsLabel }) {
	return <Link to={simsLink(simsURI)}>{simsLabel}</Link>;
}

export default connector(SimsLabelBySeries, {
	loading: () => <Spinner text={D.loadingSims} />,
});
