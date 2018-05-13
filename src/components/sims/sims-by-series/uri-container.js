import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import SimsLabelBySeries from './label-container';
import Spinner from 'components/shared/spinner';
import display from 'utils/display-results';
import D from 'i18n';

/**
 * Builds the query that retrieves the products issued of a given series.
 */
const queryBuilder = series => `
  PREFIX sdmx-mm: <http://www.w3.org/ns/sdmx-mm#>
  SELECT ?sims
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    ?sims sdmx-mm:target <${series}> .
  }
  ORDER BY ?sims
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'simsURIBySeries',
	params: ['series'],
});

function SimsURIBySeries({ simsURIBySeries, title }) {
	if (simsURIBySeries.length === 0) {
		return <span>{D.seriesHoldsNoSims}</span>;
	}
	return (
		<table className="table table-hover">
			<thead>
				<tr>
					<th className="rubric-title">{title(display(simsURIBySeries))}</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						{simsURIBySeries.map(s => (
							<SimsLabelBySeries key={s.sims} simsURI={s.sims} />
						))}
					</td>
				</tr>
			</tbody>
		</table>
	);
}

export default connector(SimsURIBySeries, {
	loading: () => <Spinner text={D.loadingSims} />,
});
