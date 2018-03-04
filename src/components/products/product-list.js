import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { productLink } from './routes';
import display from 'utils/display-results'
import D from 'i18n'

export default function ProductList({ products, title }) {
  if (products.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        {D.emptyProductList}
      </div>
    )
  title = title || D.productList;
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th className="rubric-title">{title(display(products))}</th>
        </tr>
      </thead>
      <tbody>
        {products.map(({ product, label }) => (
          <tr key={product}>
            <td>
              <Link to={productLink(product)}>
                {label}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  title: PropTypes.func,
};
