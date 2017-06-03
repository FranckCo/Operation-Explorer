import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';
import Login from './login';
import OrganizationRoutes from './organizations/routes';
import ProductRoutes from './products/routes';
import OperationRoutes from './operations/routes';

import { requireAuth } from '../utils/authentication';

export default (
  <div>
    <Route path="/login" component={Login} />
    <Route path="/" component={App} onEnter={requireAuth}>
      {OperationRoutes}
      {ProductRoutes}
      {OrganizationRoutes}
    </Route>
  </div>
);
