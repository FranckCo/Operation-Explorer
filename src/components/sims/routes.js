import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SimsContainer from './sims-container';
import config from 'config';
import { processRoute } from '../../utils/router-mapping';

export const { WrappedComponent: SimsWrapped, link: simsLink } = processRoute(
	`${config.baseHost}/qualite/rapport/:sims`,
	'/qualite/rapport/sims/:sims',
	SimsContainer
);

export default (
	<Route path="/qualite/rapport/sims">
		<Switch>
			<Route exact path="/qualite/rapport/sims/:sims" component={SimsWrapped} />
		</Switch>
	</Route>
);
