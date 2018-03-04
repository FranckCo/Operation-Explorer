import React from 'react';
import Loadable from 'react-loading-overlay';

export default ({ text }) => (
	<Loadable
		active={true}
		spinner
		text={text}
		color="#e7e7e7"
		background="grey"
		spinnerSize="300px"
	/>
);
