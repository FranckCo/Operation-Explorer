import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { seriesLink } from './routes';
import display from 'utils/display-results'
import { sortArrayByKey } from 'utils/sort-array'
import D from 'i18n'

const sortArray = sortArrayByKey('label');

export default function SeriesList({ series }) {
  if (series.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        {D.emptySeriesList}
      </div>
    );

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>{D.seriesList(display(series))}</th>
        </tr>
      </thead>
      <tbody>
        {sortArray(series).map(({ series, label }) => (
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
  series: PropTypes.array.isRequired
};
