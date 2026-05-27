import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <div className="service-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <span className="category-badge">{product.category}</span>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <div className="card-title">{product.name}</div>
        </Link>
        <Rating value={product.rating} text={`${product.numReviews} recenzija`} />
        <div className="card-price">{product.price.toLocaleString('sr-RS')} RSD</div>
        <Link to={`/booking?service=${product._id}`}>
          <button className="btn-gold" style={{ width: '100%' }}>
            Zakaži termin
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
