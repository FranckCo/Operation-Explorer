import React from 'react'
import OperationList from './operation-list'

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
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        { operations.map(({ operation, label }) =>
          <tr key={family}>
            <td>
              { label }
            </td>
          </tr>)
        }
      </tbody>
    </table>
  )
}

FamilyList.propTypes = {
  operations: React.PropTypes.array.isRequired
}
