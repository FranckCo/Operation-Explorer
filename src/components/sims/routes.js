import React from 'react';
import { Route } from 'react-router-dom';
import SIMSExplorer from './sims-explorer';

export default (
  <Route path="/sims">
    <Route exact component={SIMSExplorer} />
  </Route>
);
