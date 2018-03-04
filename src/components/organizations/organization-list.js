import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { organizationLink } from './routes';
import display from 'utils/display-results'
import D from 'i18n'

export default function OrganizationList({ organizations }) {
  if (organizations.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        {D.emptyOrganizationList}
      </div>
    )
  const organizationFiltered = organizations.filter(o => o.label);
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>{D.organizationList(display(organizationFiltered))}</th>
        </tr>
      </thead>
      <tbody>
        {organizationFiltered.map(({ organization, label }) => (
          <tr key={organization}>
            <td>
              <Link to={organizationLink(organization)}>
                {label}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

OrganizationList.propTypes = {
  organizations: PropTypes.array.isRequired
};
