import React from 'react';
import { Route, Switch } from 'react-router-dom';
import OrganizationExplorer from './organization-explorer';
import OrganizationDetails from './organization-details';
import NotFound from '../not-found'
import { proccessPatterns } from '../../utils/router-mapping';
import { connector as organizationListConnector } from './organization-explorer'

export const {
  link: organizationLinkAnnuaire
} = proccessPatterns(
    'http://lannuaire.service-public.fr/:organization',
    '/organisations/:organization'
  );

export const organizationLink = organizationURI => {
  if (rAnnuaire.test(organizationURI))
    return organizationLinkAnnuaire(organizationURI)
  else return '/organisations/unknown'
}
const rAnnuaire = new RegExp('http:\/\/lannuaire.service-public.fr\/');

const OrganizationDetailsSmart = organizationListConnector(function (props) {
  const { organizations, match: { params: { organization: orgId } } } = props
  let candidate;
  if (candidate = organizations.find(({ organization }) => organization.endsWith(orgId))) {
    return <OrganizationDetails organization={candidate.organization} />
  }
  return <UnknownOrganization id={orgId} />
})

function UnknownOrganization({ id }) {
  const message = `No organization matching the provided id \`${id}\``
  return <NotFound message={message} />
}

export default (
  <Route path="/organisations">
    <Switch>
      <Route exact path="/organisations" component={OrganizationExplorer} />
      <Route exact path="/organisations/unknown/:organization" component={UnknownOrganization} />
      <Route
        path="/organisations/:organization"
        component={OrganizationDetailsSmart}
      />
    </Switch>
  </Route>
);
