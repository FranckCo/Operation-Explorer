import React from 'react';
import { Link } from 'react-router-dom';
import {
	familyLink,
	seriesLink,
	operationLink,
} from 'components/operations/routes';
import D from 'i18n';

export default ({ target }) => {
	if (!target) return null;
	const { target: targetURI } = target;
	let link;
	try {
		link = familyLink(targetURI);
	} catch (e) {}
	try {
		link = seriesLink(targetURI);
	} catch (e) {}
	try {
		link = operationLink(targetURI);
	} catch (e) {}

	if (!link) return null;

	return (
		<div className="row">
			<Link
				className="btn btn-primary btn-lg col-md-1 col-md-offset-1"
				to={link}
			>
				{D.btnBack}
			</Link>
		</div>
	);
};
