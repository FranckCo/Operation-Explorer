import React from 'react'
import { Link } from 'react-router'

export default function OperationList({ operations }) {

  if (operations.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        La liste des opérations est vide.
      </div>
    )

  return(
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Opérations</th>
        </tr>
      </thead>
      <tbody>
        { operations.map(({ operation, label }) =>
          <tr key={operation}>
            <td>
              <Link to={operation.substring(19)}>
                { label }
              </Link>
            </td>
          </tr>)
        }
      </tbody>
    </table>
  )
}

OperationList.propTypes = {
  operations: React.PropTypes.array.isRequired
}
