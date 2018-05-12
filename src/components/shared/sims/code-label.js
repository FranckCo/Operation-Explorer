import React from 'react';
import D from 'i18n';
import './code-label.css';

export default ({ code, codes }) => {
	// TODO .toUpperCase(), really ?
	const content = codes.find(
		c => c.codeURI.toUpperCase() === code.toUpperCase()
	);
	if (!content)
		return (
			<div className="col-md-8 col-md-offset-2">
				<div className="unknow-type centered">{D.unknowCode}</div>
			</div>
		);
	return <div className="code-label">{content.label}</div>;
};
