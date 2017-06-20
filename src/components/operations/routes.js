import React from 'react';
import { Route, Switch } from 'react-router-dom';

import FamilyExplorer from './family-explorer';
import FamilyDetails from './family-details';
import OperationExplorer from './operation-explorer';
import OperationDetails from './operation-details';
import SeriesExplorer from './series-explorer';
import SeriesDetails from './series-details';
import NotFound from '../not-found'

import { processRoute } from '../../utils/router-mapping';

export const { WrappedComponent: FamilyDetailsWrapped, link: familyLink } =
  processRoute(
    'http://id.insee.fr/operations/family/:family',
    '/operations/family/:family',
    FamilyDetails
  )

export const { WrappedComponent: SeriesDetailsWrapped, link: seriesLink } =
  processRoute(
    'http://id.insee.fr/operations/series/:series',
    '/operations/series/:series',
    SeriesDetails
  );

export const { WrappedComponent: OperationDetailsWrapped, link: operationLink } =
  processRoute(
    'http://id.insee.fr/operations/operation/:operation',
    '/operations/operation/:operation',
    OperationDetails
  );

export default (
  <Route path="/operations">
    <Switch>
      <Route exact path="/operations" component={OperationExplorer} />
      <Route path="/operations/families" component={FamilyExplorer} />
      <Route
        path="/operations/family/:family"
        component={FamilyDetailsWrapped}
      />
      <Route exact path="/operations/series" component={SeriesExplorer} />
      <Route
        path="/operations/series/:series"
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
