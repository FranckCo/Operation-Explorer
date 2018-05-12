import React from 'react';
import { Date, RichText, UnknowType, CodeLabel } from 'components/shared/sims';
import * as T from 'utils/constants';

export default ({ report, activeAttr, subTitle, codes }) => {
	const attr = report
		.filter(r => !r.title && r.attr.endsWith(`/${activeAttr}`))
		.map((a, i) => {
			if (a.type === T.DATE) return <Date key={i} date={a.date} />;
			if (a.type === T.RICH_TEXT) return <RichText key={i} text={a.note} />;
			if (a.type === T.CODE)
				return <CodeLabel key={i} code={a.code} codes={codes} />;
			return <UnknowType key={i} />;
		});
	return (
		<div>
			<h3 className="centered">{subTitle}</h3>
			<div>{attr}</div>
		</div>
	);
};
