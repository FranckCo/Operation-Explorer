import React from 'react'

export default function OperationList({ operations }) {

  if (operations.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        The operation list is empty.
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
              { label }
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
