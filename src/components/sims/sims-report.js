import React from 'react';
import { DATE, RICH_TEXT } from 'utils/constants';
import D from 'i18n/dictionary'
import { Date, RichText, UnknowType, CodeLabel } from 'components/shared/sims';

export default ({ report, activeAttr, subTitle }) => {
	const attr = report
		.filter(r => !r.title && r.attr.endsWith(`/${activeAttr}`))
		.map((a, i) => {
			if (a.type === T.DATE) return <Date key={i} date={a.date} />;
			if (a.type === T.RICH_TEXT) return <RichText key={i} text={a.note} />;
			return <UnknowType key={i} />;
		});
	return (
		<div>
			<h3 className="centered">{subTitle}</h3>
			<div>{attr}</div>
		</div>
	);
};
