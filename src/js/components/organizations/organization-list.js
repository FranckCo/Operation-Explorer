import React from 'react';
import { Link } from 'react-router';
import { transform } from '../../utils/router-mapping';

export const linkOrganization = transform(
  'http://lannuaire.service-public.fr/:organization',
  'organisations/:organization'
);

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
              <Link to={linkOrganization(organization)}>
                {name}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

OrganizationList.propTypes = {
  organizations: React.PropTypes.array.isRequired
}
