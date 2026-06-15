import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useGetServicesQuery } from '../slices/ServicesApiSlice';
import Product from '../components/Product';

const CATEGORIES = ['Sve', 'Manikir', 'Pedikir', 'Spray Tan'];

const ServicesScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Sve');
  const { data: services, isLoading, error } = useGetServicesQuery();

  const filtered = !services ? [] :
    activeCategory === 'Sve'
      ? services
      : services.filter((p) => p.category === activeCategory);

  if (isLoading) return <Container className="py-5"><p style={{ color: 'var(--gray)' }}>Učitavanje...</p></Container>;
  if (error) return <Container className="py-5"><p style={{ color: '#eb5757' }}>Greška pri učitavanju usluga.</p></Container>;

  return (
    <Container className="py-5">
      <div className="mb-4">
        <p className="section-title">Šta nudimo</p>
        <h2 className="section-heading">Naše usluge</h2>
      </div>

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