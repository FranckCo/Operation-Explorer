import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';
import Login from './login';
import OrganizationRoutes from './organizations/routes';
import ProductExplorer from './product-explorer';
import OperationRoutes from './operations/routes';

import { requireAuth } from '../utils/authentication';

export default (
  <div>
    <Route path="/login" component={Login} />
    <Route path="/" component={App} onEnter={requireAuth}>
      {OperationRoutes}
      <Route path="/products">
        <IndexRoute component={ProductExplorer} />
      </Route>
      {OrganizationRoutes}
    </Route>
  </div>
);
