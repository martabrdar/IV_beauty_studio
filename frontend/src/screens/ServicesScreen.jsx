import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import products from '../products_list';
import Product from '../components/Product';

const CATEGORIES = ['Sve', 'Manikir', 'Pedikir', 'Spray Tan'];

const ServicesScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Sve');

  const filtered =
    activeCategory === 'Sve'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <Container className="py-5">
      {/* Naslov */}
      <div className="mb-4">
        <p className="section-title">Šta nudimo</p>
        <h2 className="section-heading">Naše usluge</h2>
      </div>

      {/* Filter */}
      <div className="category-filter">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid usluga */}
      <Row>
        {filtered.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} className="mb-4">
            <Product product={product} />
          </Col>
        ))}
      </Row>

      {filtered.length === 0 && (
        <div className="alert-dark-custom text-center">
          Nema usluga u ovoj kategoriji.
        </div>
      )}
    </Container>
  );
};

export default ServicesScreen;
