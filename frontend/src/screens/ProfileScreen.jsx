import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Isti helper kao u BookingScreen
const getBookings = () => {
  try {
    return JSON.parse(localStorage.getItem('iv_bookings') || '[]');
  } catch {
    return [];
  }
};

const STATUS_COLORS = {
  zakazan:  { color: 'var(--gold)',  label: 'Zakazan' },
  završen:  { color: '#6fcf97',      label: 'Završen' },
  otkazan:  { color: '#eb5757',      label: 'Otkazan' },
};

const ProfileScreen = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Učitaj termine iz localStorage
    // TODO: zameniti sa API pozivom kada bude backend
    const data = getBookings();
    // Sortiraj od najnovijeg
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setBookings(data);
  }, []);

  // Obriši jedan termin (lokalno)
  const handleCancel = (id) => {
    const updated = getBookings().map((b) =>
      b.id === id ? { ...b, status: 'otkazan' } : b
    );
    localStorage.setItem('iv_bookings', JSON.stringify(updated));
    setBookings(updated.sort((a, b) => new Date(b.date) - new Date(a.date)));
    // TODO: API poziv za otkazivanje
  };

  // Podeli termine na predstojeće i prošle
  const today = new Date().toISOString().split('T')[0];
  const upcoming = bookings.filter((b) => b.date >= today && b.status === 'zakazan');
  const past     = bookings.filter((b) => b.date <  today || b.status !== 'zakazan');

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={7}>
      {/* Header profila */}
      <div className="mb-5">
        <p className="section-title">Moj nalog</p>
        <h2 className="section-heading">Istorija termina</h2>

        {/* Placeholder info korisnika — zameniće se podacima iz backend-a */}
        <div
          style={{
            background: 'var(--black-card)',
            border: '1px solid var(--black-border)',
            borderRadius: 'var(--radius)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--white)' }}>
              Gost korisnik
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--gray)', letterSpacing: '0.05em' }}>
              {/* TODO: prikazati email iz Redux state-a */}
              Prijavite se za pun pristup
            </div>
          </div>
          <Link to="/login">
            <button className="btn-outline-gold" style={{ padding: '0.5rem 1.25rem' }}>
              Prijava
            </button>
          </Link>
        </div>
      </div>

      {/* ── PREDSTOJEĆI TERMINI ── */}
      <div className="mb-2">
        <p className="section-title">Predstojeći</p>
      </div>

      {upcoming.length === 0 ? (
        <div className="alert-dark-custom mb-4" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem', color: 'var(--gray)', fontSize: '0.8rem' }}>
            Nemate zakazanih termina.
          </div>
          <Link to="/booking">
            <button className="btn-gold" style={{ padding: '0.6rem 1.5rem' }}>
              Zakaži termin
            </button>
          </Link>
        </div>
      ) : (
        upcoming.map((b) => (
          <BookingCard key={b.id} booking={b} onCancel={handleCancel} showCancel />
        ))
      )}

      {/* ── PROŠLI TERMINI ── */}
      {past.length > 0 && (
        <>
          <div className="ornament">
            <span>✦</span>
          </div>
          <div className="mb-2">
            <p className="section-title">Istorija</p>
          </div>
          {past.map((b) => (
            <BookingCard key={b.id} booking={b} onCancel={handleCancel} showCancel={false} />
          ))}
        </>
      )}

      {bookings.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--gray)', fontSize: '0.8rem' }}>
          Termini zakazani kroz aplikaciju pojaviće se ovde.
        </div>
      )}

        </Col>
      </Row>
    </Container>
  );
};

// ── KARTICA TERMINA ──
const BookingCard = ({ booking, onCancel, showCancel }) => {
  const status = STATUS_COLORS[booking.status] || STATUS_COLORS['zakazan'];

  return (
    <div
      style={{
        background: 'var(--black-card)',
        border: '1px solid var(--black-border)',
        borderRadius: 'var(--radius)',
        padding: '1.25rem 1.5rem',
        marginBottom: '0.75rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '1rem',
      }}
    >
      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--white)', marginBottom: '0.35rem' }}>
          {booking.serviceName}
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--gray)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
          Tehničar: <span style={{ color: 'var(--white-dim)' }}>{booking.technicianName}</span>
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--gray)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
          {booking.date} u {booking.timeSlot}
        </div>
        {booking.note && (
          <div style={{ fontSize: '0.7rem', color: 'var(--gray)', fontStyle: 'italic', marginTop: '0.25rem' }}>
            "{booking.note}"
          </div>
        )}
      </div>

      {/* Desna strana: cena + status + dugme */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.5rem' }}>
          {booking.servicePrice?.toLocaleString('sr-RS')} RSD
        </div>
        <div
          style={{
            display: 'inline-block',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: status.color,
            border: `1px solid ${status.color}`,
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius)',
            marginBottom: showCancel ? '0.75rem' : 0,
          }}
        >
          {status.label}
        </div>

        {showCancel && booking.status === 'zakazan' && (
          <div>
            <button
              onClick={() => onCancel(booking.id)}
              style={{
                background: 'transparent',
                border: '1px solid var(--black-border)',
                color: 'var(--gray)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = '#eb5757'; e.target.style.color = '#eb5757'; }}
              onMouseLeave={(e) => { e.target.style.borderColor = 'var(--black-border)'; e.target.style.color = 'var(--gray)'; }}
            >
              Otkaži
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
