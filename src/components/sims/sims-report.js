import React from 'react';
import Date from 'components/shared/sims/date';
import RichText from 'components/shared/sims/rich-text';
import { DATE, RICH_TEXT } from 'utils/constants';
import D from 'i18n/dictionary'

export default ({ report, activeAttr, subTitle }) => {
	const attr = report
		.filter(r => !r.title && r.attr.endsWith(`/${activeAttr}`))
		.map((a, i) => {
			if (a.type === DATE) return <Date key={i} date={a.date} />;
			if (a.type === RICH_TEXT) return <RichText key={i} text={a.note} />;
			return <div key={i}>{D.unknowType}</div>;
		});
	return (
		<div>
			<h3 className="centered">{subTitle}</h3>
			<div>{attr}</div>
		</div>
	);
};
