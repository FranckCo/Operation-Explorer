import React from 'react';
import { Link } from 'react-router';
import { seriesLink } from './routes';

export default function SeriesList({ series }) {
  if (series.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        La liste des séries est vide
      </div>
    );

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Série</th>
        </tr>
      </thead>
      <tbody>
        {series.map(({ series, label }) => (
          <tr key={series}>
            <td>
              <Link to={seriesLink(series)}>
                {label}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

SeriesList.propTypes = {
  series: React.PropTypes.array.isRequired
}
