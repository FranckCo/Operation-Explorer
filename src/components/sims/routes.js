import React from 'react';
import { Route, IndexRoute } from 'react-router';
import SIMSExplorer from './sims-explorer';

export default (
  <Route path="/sims">
    <IndexRoute component={SIMSExplorer} />
  </Route>
);
