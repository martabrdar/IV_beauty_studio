import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetMyBookingsQuery, useCancelBookingMutation } from '../slices/BookingsApiSlice';
import { logout } from '../slices/UserSlice';

const STATUS_COLORS = {
  zakazano: { color: 'var(--gold)', label: 'Zakazano' },
  završeno: { color: '#6fcf97', label: 'Završeno' },
  otkazano: { color: '#eb5757', label: 'Otkazano' },
};

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { data: bookings, isLoading, refetch } = useGetMyBookingsQuery(undefined, { skip: !userInfo });
  const [cancelBooking] = useCancelBookingMutation();

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id).unwrap();
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const upcoming = bookings?.filter((b) => b.date >= today && b.status === 'zakazano') || [];
  const past = bookings?.filter((b) => b.date < today || b.status !== 'zakazano') || [];

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={7}>
          <div className="mb-5">
            <p className="section-title">Moj nalog</p>
            <h2 className="section-heading">Istorija termina</h2>

            <div style={{ background: 'var(--black-card)', border: '1px solid var(--black-border)', borderRadius: 'var(--radius)', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--white)' }}>
                  {userInfo ? userInfo.name : 'Gost korisnik'}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--gray)', letterSpacing: '0.05em' }}>
                  {userInfo ? userInfo.email : 'Prijavite se za pun pristup'}
                </div>
              </div>
              {userInfo ? (
                <button className="btn-outline-gold" style={{ padding: '0.5rem 1.25rem' }} onClick={() => dispatch(logout())}>
                  Odjavi se
                </button>
              ) : (
                <Link to="/login">
                  <button className="btn-outline-gold" style={{ padding: '0.5rem 1.25rem' }}>Prijava</button>
                </Link>
              )}
            </div>
          </div>

          <div className="mb-2"><p className="section-title">Predstojeći</p></div>

          {isLoading ? (
            <p style={{ color: 'var(--gray)' }}>Učitavanje...</p>
          ) : upcoming.length === 0 ? (
            <div className="alert-dark-custom mb-4" style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '1rem', color: 'var(--gray)', fontSize: '0.8rem' }}>Nemate zakazanih termina.</div>
              <Link to="/booking"><button className="btn-gold" style={{ padding: '0.6rem 1.5rem' }}>Zakaži termin</button></Link>
            </div>
          ) : (
            upcoming.map((b) => <BookingCard key={b._id} booking={b} onCancel={handleCancel} showCancel />)
          )}

          {past.length > 0 && (
            <>
              <div className="ornament"><span>✦</span></div>
              <div className="mb-2"><p className="section-title">Istorija</p></div>
              {past.map((b) => <BookingCard key={b._id} booking={b} onCancel={handleCancel} showCancel={false} />)}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

const BookingCard = ({ booking, onCancel, showCancel }) => {
  const status = STATUS_COLORS[booking.status] || STATUS_COLORS['zakazano'];
  return (
    <div style={{ background: 'var(--black-card)', border: '1px solid var(--black-border)', borderRadius: 'var(--radius)', padding: '1.25rem 1.5rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--white)', marginBottom: '0.35rem' }}>
          {booking.service?.name}
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--gray)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
          Tehničar: <span style={{ color: 'var(--white-dim)' }}>{booking.technician?.name}</span>
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--gray)', letterSpacing: '0.05em' }}>
          {new Date(booking.date).toLocaleDateString('sr-RS')} u {booking.time}
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.5rem' }}>
          {booking.service?.price?.toLocaleString('sr-RS')} RSD
        </div>
        <div style={{ display: 'inline-block', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: status.color, border: `1px solid ${status.color}`, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius)', marginBottom: showCancel ? '0.75rem' : 0 }}>
          {status.label}
        </div>
        {showCancel && booking.status === 'zakazano' && (
          <div>
            <button onClick={() => onCancel(booking._id)} style={{ background: 'transparent', border: '1px solid var(--black-border)', color: 'var(--gray)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius)', cursor: 'pointer' }}>
              Otkaži
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;