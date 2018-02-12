import React from 'react';
import { Route, Switch } from 'react-router-dom';

import FamilyExplorer from './family-explorer';
import FamilyDetails from './family-details';
import OperationExplorer from './operation-explorer';
import OperationDetails from './operation-details';
import SeriesExplorer from './series-explorer';
import SeriesDetails from './series-details';
import NotFound from '../not-found'
import config from 'config'
import { processRoute } from '../../utils/router-mapping';

export const { WrappedComponent: FamilyDetailsWrapped, link: familyLink } =
  processRoute(
    `${config.baseHost}/operations/famille/:family`,
    '/operations/famille/:family',
    FamilyDetails
  )

export const { WrappedComponent: SeriesDetailsWrapped, link: seriesLink } =
  processRoute(
    `${config.baseHost}/operations/serie/:series`,
    '/operations/serie/:series',
    SeriesDetails
  );

export const { WrappedComponent: OperationDetailsWrapped, link: operationLink } =
  processRoute(
    `${config.baseHost}/operations/operation/:operation`,
    '/operations/operation/:operation',
    OperationDetails
  );

export default (
  <Route path="/operations">
    <Switch>
      <Route exact path="/operations" component={OperationExplorer} />
      <Route path="/operations/familles" component={FamilyExplorer} />
      <Route
        path="/operations/famille/:family"
        component={FamilyDetailsWrapped}
      />
      <Route exact path="/operations/series" component={SeriesExplorer} />
      <Route
        path="/operations/serie/:series"
        component={SeriesDetailsWrapped}
      />
      <Route
        path="/operations/operation/:operation"
        component={OperationDetailsWrapped}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  </Route>
);
