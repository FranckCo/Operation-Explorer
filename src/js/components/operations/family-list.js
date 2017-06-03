import React from 'react'

export default function FamilyList({ families }) {

  if (families.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        The family list is empty.
      </div>
    )

  return(
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Famille</th>
        </tr>
      </thead>
      <tbody>
        { families.map(({ family, label }) =>
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
  families: React.PropTypes.array.isRequired
}
