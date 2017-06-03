import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';
import Login from './login';
import FamilyExplorer from './operations/family-explorer';
import OrganizationExplorer from './organization-explorer';
import OperationExplorer from './operations/operation-explorer';
import OperationDetails from './operations/operation-details';
import ProductExplorer from './product-explorer';
import SeriesExplorer from './operations/series-explorer';
import SeriesDetails from './operations/series-details';

import { requireAuth } from '../utils/authentication';

export default (
  <div>
    <Route path="/login" component={Login} />
    <Route path="/" component={App} onEnter={requireAuth}>
      <Route path="/families">
        <IndexRoute component={FamilyExplorer} />
      </Route>
      <Route path="/series">
        <IndexRoute component={SeriesExplorer} />
      </Route>
      <Route path="/operations">
        <IndexRoute component={OperationExplorer} />
        <Route
          path="operation/:operation"
          component={OperationDetails}
          transform="http://id.insee.fr/operations/operation/:operation"
        />
        <Route
          path="series/:series"
          component={SeriesDetails}
          transform="http://id.insee.fr/operations/series/:series"
        />
      </Route>
      <Route path="/products">
        <IndexRoute component={ProductExplorer} />
      </Route>
      <Route path="/producers">
        <IndexRoute component={OrganizationExplorer} />
      </Route>
    </Route>
  </div>
);
