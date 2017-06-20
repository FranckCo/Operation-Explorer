import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SIMSExplorer from './sims-explorer';
import SimsDetails from './sims-details'
import { proccessPatterns } from '../../utils/router-mapping';

export const { link: simsLink, transform: simsTransform } = proccessPatterns(
  'http://id.insee.fr/qualite/rapport/:sims',
  '/sims/:sims'
);

export default (
  <Route path="/sims">
    <Switch>
      <Route path="/sims/:sims" component={simsTransform(SimsDetails)} />
      <Route exact component={SIMSExplorer} />
    </Switch>
  </Route>
);
