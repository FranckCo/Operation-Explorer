import React from 'react';
import { Route, IndexRoute } from 'react-router';
import OrganizationExplorer from './organization-explorer';
import OrganizationDetails from './organization-details';

export default (
  <Route path="/organisations">
    <IndexRoute component={OrganizationExplorer} />
    <Route
      path=":organization"
      component={OrganizationDetails}
      transform="http://lannuaire.service-public.fr/:organization"
    />
  </Route>
);
