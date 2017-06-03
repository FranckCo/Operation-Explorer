import React from 'react';
import { Link } from 'react-router';
import { transform } from '../../utils/router-mapping';

export const linkOperation = transform(
  'http://id.insee.fr/operations/operation/:operation',
  'operations/operation/:operation'
);

export default function OperationList({ operations }) {
  if (operations.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        La liste des opérations est vide.
      </div>
    );

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Opérations</th>
        </tr>
      </thead>
      <tbody>
        {operations.map(({ operation, label }) => (
          <tr key={operation}>
            <td>
              <Link to={linkOperation(operation)}>
                {label}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

OperationList.propTypes = {
  operations: React.PropTypes.array.isRequired
};
