import React from 'react';
import { Route, IndexRoute } from 'react-router';

import FamilyExplorer from './family-explorer';
import FamilyDetails from './family-details';
import OperationExplorer from './operation-explorer';
import OperationDetails from './operation-details';
import SeriesExplorer from './series-explorer';
import SeriesDetails from './series-details';

export default (
  <Route path="/operations">
    <IndexRoute component={OperationExplorer} />
    <Route path="families">
      <IndexRoute component={FamilyExplorer} />
    </Route>
    <Route path="series">
      <IndexRoute component={SeriesExplorer} />
    </Route>
    <Route
      path="/family/:family"
      component={FamilyDetails}
      transform="http://id.insee.fr/operations/family/:family"
    />
    <Route
      path="/series/:series"
      component={SeriesDetails}
      transform="http://id.insee.fr/operations/series/:series"
    />
    <Route
      path="operation/:operation"
      component={OperationDetails}
      transform="http://id.insee.fr/operations/operation/:operation"
    />
  </Route>
);
