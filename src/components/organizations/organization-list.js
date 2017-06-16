import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { organizationLink } from './routes';

export default function OrganizationList({ organizations }) {
  if (organizations.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        La liste des organisations est vide
      </div>
    )

  return(
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Organisation</th>
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
