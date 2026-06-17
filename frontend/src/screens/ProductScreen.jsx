import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetServiceByIdQuery } from '../slices/ServicesApiSlice';
import { useGetReviewsByServiceQuery, useCreateReviewMutation } from '../slices/ReviewsApiSlice';
import Rating from '../components/Rating';

const ProductScreen = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.user);
  const { data: product, isLoading, error } = useGetServiceByIdQuery(id);
  const { data: reviews, refetch } = useGetReviewsByServiceQuery(id);
  const [createReview] = useCreateReviewMutation();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError('');
    try {
      await createReview({ id, rating, comment }).unwrap();
      setComment('');
      setRating(5);
      setReviewSuccess(true);
      refetch();
    } catch (err) {
      setReviewError(err?.data?.message || 'Greška pri slanju recenzije.');
    }
  };

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

      {reviews?.length === 0 && (
        <div className="alert-dark-custom mb-4" style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>
          Još nema recenzija za ovu uslugu.
        </div>
      )}

      {reviews?.map((review) => (
        <div key={review._id} className="review-card">
          <div className="review-author">{review.name}</div>
          <div className="review-date">{new Date(review.createdAt).toLocaleDateString('sr-RS')}</div>
          <Rating value={review.rating} />
          <p className="review-text">{review.comment}</p>
        </div>
      ))}

      <div className="ornament"><span>✦</span></div>

      {userInfo ? (
        <div style={{ background: 'var(--black-card)', border: '1px solid var(--black-border)', borderRadius: 'var(--radius)', padding: '1.5rem', marginTop: '1rem' }}>
          <p className="section-title" style={{ marginBottom: '1rem' }}>Ostavite recenziju</p>
          {reviewError && <div className="alert-dark-custom mb-3" style={{ color: '#eb5757', borderColor: '#eb5757' }}>{reviewError}</div>}
          {reviewSuccess && <div className="alert-dark-custom mb-3" style={{ color: '#6fcf97', borderColor: '#6fcf97' }}>Recenzija uspešno dodata!</div>}
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-3">
              <label className="form-label">Ocena</label>
              <select className="form-select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                <option value={5}>5 — Odlično</option>
                <option value={4}>4 — Vrlo dobro</option>
                <option value={3}>3 — Dobro</option>
                <option value={2}>2 — Loše</option>
                <option value={1}>1 — Veoma loše</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Komentar</label>
              <textarea className="form-control" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} required placeholder="Podelite vaše iskustvo..." />
            </div>
            <button type="submit" className="btn-gold" style={{ fontSize: '0.75rem' }}>Pošalji recenziju</button>
          </form>
        </div>
      ) : (
        <div className="alert-dark-custom mt-3" style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>
          Prijavite se da biste ostavili recenziju.{' '}
          <Link to="/login" style={{ color: 'var(--gold)' }}>Prijava →</Link>
        </div>
      )}
    </Container>
  );
};

export default ProductScreen;