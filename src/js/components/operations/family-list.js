import React from 'react';
import { Link } from 'react-router';
import { familyLink } from './routes';

export default function FamilyList({ families }) {
  if (families.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        La liste des familles est vide
      </div>
    )

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Famille</th>
        </tr>
      </thead>
      <tbody>
        {families.map(({ family, label }) =>
          <tr key={family}>
            <td>
              <Link to={familyLink(family)}>
                {label}
              </Link>
            </td>
          </tr>)
        }
      </tbody>
    </table>
  )
}

FamilyList.propTypes = {
  families: React.PropTypes.array.isRequired
}
