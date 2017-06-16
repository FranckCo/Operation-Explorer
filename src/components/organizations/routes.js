import React from 'react';
import { Route, IndexRoute } from 'react-router';
import OrganizationExplorer from './organization-explorer';
import OrganizationDetails from './organization-details';
import { transform } from '../../utils/router-mapping';

export const organizationLink = transform(
  'http://lannuaire.service-public.fr/:organization',
  'organisations/:organization'
);

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
