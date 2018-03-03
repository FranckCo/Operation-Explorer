import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { operationLink } from './routes';
import display from 'utils/display-results'
import { sortArrayByKey } from 'utils/sort-array'
import D from 'i18n'

const sortArray = sortArrayByKey('label');

export default function OperationList({ operations }) {
  if (operations.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        {D.emptyOperationList}
      </div>
    );

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>{D.operationList(display(operations))}</th>
        </tr>
      </thead>
      <tbody>
        {sortArray(operations).map(({ operation, label }) => (
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
  operations: PropTypes.array.isRequired
};
