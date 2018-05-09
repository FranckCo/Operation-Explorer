import React from 'react';
import DOMPurify from 'dompurify';
import './rich-text.css';

export default ({ text }) => (
	<div className="rich-text">
		<div
			dangerouslySetInnerHTML={{
				__html: DOMPurify.sanitize(text),
			}}
		/>
	</div>
);
