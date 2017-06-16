import React from 'react';
import { Link } from 'react-router';
import { operationLink } from './routes';

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
          <th>Opération</th>
        </tr>
      </thead>
      <tbody>
        {operations.map(({ operation, label }) => (
          <tr key={operation}>
            <td>
              <Link to={operationLink(operation)}>
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
