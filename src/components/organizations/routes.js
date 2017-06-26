import React from 'react';
import { Route, Switch } from 'react-router-dom';
import OrganizationExplorer from './organization-explorer';
import OrganizationDetails from './organization-details';
import NotFound from '../not-found'
import { connector as organizationListConnector } from './organization-explorer'

export const organizationLink = organizationURI => {
  const orgId = organizationURI.split('/').pop()
  return `/organisations/${orgId}`
}

const OrganizationDetailsSmart = organizationListConnector(function (props) {
  const { organizations, match: { params: { organization: orgId } } } = props
  const candidate = organizations.find(({ organization }) => organization.endsWith(orgId))
  if (candidate) {
    return <OrganizationDetails organization={candidate.organization} />
  }
  return <UnknownOrganization orgId={orgId} />
})

function UnknownOrganization({ orgId }) {
  const message = `No organization matching the provided id \`${orgId}\``
  return <NotFound message={message} />
}

export default (
  <Route path="/organisations">
    <Switch>
      <Route exact path="/organisations" component={OrganizationExplorer} />
      <Route
        path="/organisations/:organization"
        component={OrganizationDetailsSmart}
      />
    </Switch>
  </Route>
);
