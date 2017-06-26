import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { familyLink } from './routes';
import D from 'i18n'

export default function FamilyList({ families }) {
  if (families.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        {D.emptyFamilyList}
      </div>
    )

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>{D.family}</th>
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
  families: PropTypes.array.isRequired
};
