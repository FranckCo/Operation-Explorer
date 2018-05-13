import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { simsLink } from '../routes';
import display from 'utils/display-results';
import D from 'i18n';

export default function SimsList({ sims, title }) {
	if (sims.length === 0)
		return (
			<div className="alert alert-warning" role="alert">
				{D.emptySimsList}
			</div>
		);
	title = title || D.simsList;
	return (
		<table className="table table-hover">
			<thead>
				<tr>
					<th className="rubric-title">{title(display(sims))}</th>
				</tr>
			</thead>
			<tbody>
				{sims.map(({ sims, label }) => (
					<tr key={sims}>
						<td>
							<Link to={simsLink(sims)}>{label}</Link>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

SimsList.propTypes = {
	sims: PropTypes.array.isRequired,
	title: PropTypes.func,
};
