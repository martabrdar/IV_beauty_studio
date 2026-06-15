import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useGetServiceByIdQuery } from '../slices/ServicesApiSlice';
import Rating from '../components/Rating';

const MOCK_REVIEWS = [
  { id: 1, author: 'Marija P.', date: '15. april 2025.', rating: 5, text: 'Odličan tretman! Preporučujem svima, osoblje je izuzetno ljubazno.' },
  { id: 2, author: 'Jelena M.', date: '2. maj 2025.', rating: 5, text: 'Savršeno urađeno, rezultat traje dugo. Definitivno se vraćam!' },
];

const ProductScreen = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetServiceByIdQuery(id);

  if (isLoading) return <Container className="py-5"><p style={{ color: 'var(--gray)' }}>Učitavanje...</p></Container>;
  if (error || !product) return (
    <Container className="py-5">
      <div className="alert-dark-custom">Usluga nije pronađena.</div>
      <Link to="/services"><button className="btn-outline-gold mt-3">← Nazad na usluge</button></Link>
    </Container>
  );

  return (
    <Container className="py-5">
      <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--gray)', marginBottom: '2rem' }}>
        <Link to="/" style={{ color: 'var(--gray)' }}>Početna</Link>
        <span style={{ margin: '0 0.75rem', color: 'var(--black-border)' }}>›</span>
        <Link to="/services" style={{ color: 'var(--gray)' }}>Usluge</Link>
        <span style={{ margin: '0 0.75rem', color: 'var(--black-border)' }}>›</span>
        <span style={{ color: 'var(--gold)' }}>{product.name}</span>
      </div>

      <Row>
        <Col md={6} className="mb-4 mb-md-0">
          <img src={product.image} alt={product.name} className="product-detail-img" />
        </Col>
        <Col md={6}>
          <span className="category-badge">{product.category}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginBottom: '0.5rem' }}>{product.name}</h1>
          <div className="product-detail-price">{product.price?.toLocaleString('sr-RS')} RSD</div>
          <p className="product-detail-desc">{product.description}</p>
          <div style={{ marginBottom: '1.5rem', fontSize: '0.75rem', color: 'var(--gray)' }}>
            <span style={{ color: '#6fcf97' }}>● Dostupni termini</span>
          </div>
          <Link to={`/booking?service=${product._id}`}>
            <button className="btn-gold" style={{ width: '100%', marginBottom: '0.75rem' }}>Zakaži termin</button>
          </Link>
          <Link to="/services">
            <button className="btn-outline-gold" style={{ width: '100%' }}>← Nazad na usluge</button>
          </Link>
        </Col>
      </Row>

      <div className="ornament"><span>✦</span></div>
      <div className="mb-4">
        <p className="section-title">Mišljenja klijenata</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, marginBottom: '1.5rem' }}>Recenzije</h3>
      </div>

      {MOCK_REVIEWS.map((review) => (
        <div key={review.id} className="review-card">
          <div className="review-author">{review.author}</div>
          <div className="review-date">{review.date}</div>
          <Rating value={review.rating} />
          <p className="review-text">{review.text}</p>
        </div>
      ))}

      <div className="alert-dark-custom mt-3" style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>
        Prijavite se da biste ostavili recenziju.{' '}
        <Link to="/login" style={{ color: 'var(--gold)' }}>Prijava →</Link>
      </div>
    </Container>
  );
};

export default ProductScreen;