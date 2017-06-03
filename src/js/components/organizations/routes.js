import React from 'react';
import { Route, IndexRoute } from 'react-router';

import OrganizationExplorer from './organization-explorer';

export default (
  <Route path="/producers">
    <IndexRoute component={OrganizationExplorer} />
  </Route>
);
