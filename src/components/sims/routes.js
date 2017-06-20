import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SIMSExplorer from './sims-explorer';
import SimsDetails from './sims-details'
import { processRoute } from '../../utils/router-mapping';

export const { WrappedComponent: SimsDetailsWrapped, link: simsLink } = processRoute(
  'http://id.insee.fr/qualite/rapport/:sims',
  '/sims/:sims',
  SimsDetails
);

export default (
  <Route path="/sims">
    <Switch>
      <Route path="/sims/:sims" component={SimsDetailsWrapped} />
      <Route exact component={SIMSExplorer} />
    </Switch>
  </Route>
);
