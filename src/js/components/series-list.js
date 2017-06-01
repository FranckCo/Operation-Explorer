import React from 'react'

export default function SeriesList({ series }) {

  if (series.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        The series list is empty.
      </div>
    )

  return(
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Série</th>
        </tr>
      </thead>
      <tbody>
        { series.map(({ seriesItem, label }) =>
          <tr key={seriesItem}>
            <td>
              { label }
            </td>
          </tr>)
        }
      </tbody>
    </table>
  )
}

SeriesList.propTypes = {
  series: React.PropTypes.array.isRequired
}
