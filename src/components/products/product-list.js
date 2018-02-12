import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { productLink } from './routes';
import D from 'i18n'

export default function ProductList({ products }) {
  if (products.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        {D.emptyProductList}
      </div>
    )

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>{D.product}</th>
        </tr>
      </thead>
      <tbody>
        {products.map(({ product, name }) => (
          <tr key={product}>
            <td>
              <Link to={productLink(product)}>
                {name}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};
