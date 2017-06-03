import React from 'react'

export default function OrganizationList({ organizations }) {

  if (organizations.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        La liste des opérations est vide
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
        { organizations.map(({ organization, name }) =>
          <tr key={organization}>
            <td>
              { name }
            </td>
          </tr>)
        }
      </tbody>
    </table>
  )
}

OrganizationList.propTypes = {
  organizations: React.PropTypes.array.isRequired
}
