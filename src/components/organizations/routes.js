import React from 'react';
import { Route, Switch } from 'react-router-dom';
import OrganizationExplorer from './organization-explorer';
import OrganizationDetails from './organization-details';
import { proccessPatterns } from '../../utils/router-mapping';

export const { link: organizationLink, transform: organizationTransform } = proccessPatterns(
  'http://lannuaire.service-public.fr/:organization',
  '/organisations/:organization'
);

export default (
  <Switch>
    <Route exact path="/organisations" component={OrganizationExplorer} />
    <Route
      path="/organisations/:organization"
      component={organizationTransform(OrganizationDetails)}
    />
  </Switch>
);
