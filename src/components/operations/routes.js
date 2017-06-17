import React from 'react';
import { Route, Switch } from 'react-router-dom';

import FamilyExplorer from './family-explorer';
import FamilyDetails from './family-details';
import OperationExplorer from './operation-explorer';
import OperationDetails from './operation-details';
import SeriesExplorer from './series-explorer';
import SeriesDetails from './series-details';
import { proccessPatterns } from '../../utils/router-mapping';

export const { link: familyLink, transform: familyTransform } = proccessPatterns(
  'http://id.insee.fr/operations/family/:family',
  '/operations/family/:family'
);


export const { link: seriesLink, transform: seriesTransform } = proccessPatterns(
  'http://id.insee.fr/operations/series/:series',
  '/operations/series/:series'
);

export const { link: operationLink, transform: operationTransform } = proccessPatterns(
  'http://id.insee.fr/operations/operation/:operation',
  '/operations/operation/:operation'
);

export default (
  <Route path="/operations">
    <Switch>
      <Route exact path="/operations" component={OperationExplorer} />
      <Route path="/operations/families" component={FamilyExplorer} />
      <Route
        path="/operations/family/:family"
        component={familyTransform(FamilyDetails)}
      />
      <Route exact path="/operations/series" component={SeriesExplorer} />
      <Route
        path="/operations/series/:series"
        component={seriesTransform(SeriesDetails)}
      />
      <Route
        path="/operations/operation/:operation"
        component={operationTransform(OperationDetails)}
      />
    </Switch>
  </Route>
);
