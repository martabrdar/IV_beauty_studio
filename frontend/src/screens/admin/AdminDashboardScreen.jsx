import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../slices/AdminSlice';
// import { useGetStatsQuery } from '../../slices/AdminApiSlice';
// import { useGetAllBookingsQuery } from '../../slices/BookingsApiSlice';


// Privremeni termini iz localStorage
const getBookings = () => {
  try { return JSON.parse(localStorage.getItem('iv_bookings') || '[]'); }
  catch { return []; }
};

const STATUS_COLORS = {
  zakazan: 'var(--gold)',
  završen: '#6fcf97',
  otkazan: '#eb5757',
};

const AdminDashboardScreen = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { adminInfo } = useSelector((state) => state.admin);

  // Redirect ako nije admin
  if (!adminInfo) {
    navigate('/admin/login');
    return null;
  }

  // Privremeni podaci — zameniće se API pozivima
  const bookings = getBookings();
  const stats = {
    ukupnoTermina:  bookings.length,
    danas:          bookings.filter(b => b.date === new Date().toISOString().split('T')[0]).length,
    zakazano:       bookings.filter(b => b.status === 'zakazan').length,
    prihod:         bookings.filter(b => b.status !== 'otkazan').reduce((sum, b) => sum + (b.servicePrice || 0), 0),
  };

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate('/admin/login');
  };

  return (
    <Container className="py-5">

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
        <div>
          <p className="section-title">Admin panel</p>
          <h2 className="section-heading" style={{ marginBottom: '0.25rem' }}>Dashboard</h2>
          <div style={{ fontSize: '0.7rem', color: 'var(--gray)' }}>
            Prijavljeni kao: <span style={{ color: 'var(--white-dim)' }}>{adminInfo.email}</span>
          </div>
        </div>
        <button className="btn-outline-gold" onClick={handleLogout} style={{ padding: '0.5rem 1.25rem', fontSize: '0.65rem' }}>
          Odjavi se
        </button>
      </div>

      {/* Statistike */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
        {[
          { label: 'Ukupno termina',  value: stats.ukupnoTermina },
          { label: 'Danas',           value: stats.danas },
          { label: 'Zakazano',        value: stats.zakazano },
          { label: 'Prihod (RSD)',    value: stats.prihod.toLocaleString('sr-RS') },
        ].map((item, i) => (
          <div key={i} style={{
            flex: 1,
            background: 'var(--black-card)',
            border: '1px solid var(--black-border)',
            borderRadius: 'var(--radius)',
            padding: '1.25rem',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>
              {item.value}
            </div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray)', marginTop: '0.4rem' }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Brze akcije */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '3rem' }}>
        <Link to="/admin/services">
          <button className="btn-gold" style={{ fontSize: '0.7rem' }}>+ Dodaj uslugu</button>
        </Link>
        <Link to="/admin/bookings">
          <button className="btn-outline-gold" style={{ fontSize: '0.7rem' }}>Svi termini</button>
        </Link>
        <Link to="/admin/users">
          <button className="btn-outline-gold" style={{ fontSize: '0.7rem' }}>Korisnici</button>
        </Link>
      </div>

      {/* Poslednji termini */}
      <div className="mb-3">
        <p className="section-title">Poslednji termini</p>
      </div>

      {bookings.length === 0 ? (
        <div className="alert-dark-custom" style={{ textAlign: 'center', color: 'var(--gray)', fontSize: '0.8rem' }}>
          Nema zakazanih termina.
        </div>
      ) : (
        [...bookings].reverse().slice(0, 10).map((b) => (
          <div key={b.id} style={{
            background: 'var(--black-card)',
            border: '1px solid var(--black-border)',
            borderRadius: 'var(--radius)',
            padding: '1rem 1.25rem',
            marginBottom: '0.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
          }}>
            <div>
              <div style={{ color: 'var(--white)', marginBottom: '0.2rem', fontFamily: 'var(--font-display)', fontSize: '1rem' }}>
                {b.serviceName}
              </div>
              <div style={{ color: 'var(--gray)', fontSize: '0.7rem' }}>
                {b.technicianName} · {b.date} u {b.timeSlot}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--gold)', marginBottom: '0.3rem' }}>
                {b.servicePrice?.toLocaleString('sr-RS')} RSD
              </div>
              <div style={{
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: STATUS_COLORS[b.status] || 'var(--gray)',
                border: `1px solid ${STATUS_COLORS[b.status] || 'var(--gray)'}`,
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius)',
                display: 'inline-block',
              }}>
                {b.status}
              </div>
            </div>
          </div>
        ))
      )}

    </Container>
  );
};

export default AdminDashboardScreen;
