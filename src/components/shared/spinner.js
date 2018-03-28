import React from 'react';
import ReactLoading from 'react-loading';
import './spinner.css';

export default ({ text }) => (
	<div className="container centered">
		<div className="row loading-row">
			<div className="col-md-4 col-md-offset-4">
				<ReactLoading
					type="spinningBubbles"
					delay={0}
					color="#777"
					height="100%"
					width="100%"
				/>
			</div>
		</div>
		<h3 className="loading-color">{text}</h3>
	</div>
);
