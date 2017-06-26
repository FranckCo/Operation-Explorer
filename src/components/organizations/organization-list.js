import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { organizationLink } from './routes';
import D from 'i18n'

export default function OrganizationList({ organizations }) {
  if (organizations.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        {D.emptyOrganizationList}
      </div>
    )

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>{D.organization}</th>
        </tr>
      </thead>
      <tbody>
        {organizations.map(({ organization, name }) => (
          <tr key={organization}>
            <td>
              <Link to={organizationLink(organization)}>
                {name}
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
