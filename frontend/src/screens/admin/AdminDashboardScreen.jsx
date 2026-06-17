import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../slices/AdminSlice';

const STATUS_COLORS = {
  zakazano: 'var(--gold)',
  završeno: '#6fcf97',
  otkazano: '#eb5757',
};

const AdminDashboardScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminInfo } = useSelector((state) => state.admin);

  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!adminInfo) {
      navigate('/admin/login');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminInfo.token}`,
    };

    fetch('http://localhost:5000/api/bookings', { headers })
      .then((r) => r.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));

    fetch('http://localhost:5000/api/admin/stats', { headers })
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, [adminInfo, navigate]);

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate('/admin/login');
  };

  if (!adminInfo) return null;

  return (
    <Container className="py-5">
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
          { label: 'Ukupno termina', value: stats?.totalBookings ?? '—' },
          { label: 'Danas', value: stats?.todayBookings ?? '—' },
          { label: 'Korisnici', value: stats?.totalUsers ?? '—' },
          { label: 'Prihod (RSD)', value: stats?.totalRevenue?.toLocaleString('sr-RS') ?? '—' },
        ].map((item, i) => (
          <div key={i} style={{ flex: 1, background: 'var(--black-card)', border: '1px solid var(--black-border)', borderRadius: 'var(--radius)', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>{item.value}</div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray)', marginTop: '0.4rem' }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Brze akcije */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '3rem' }}>
        <Link to="/admin/services"><button className="btn-gold" style={{ fontSize: '0.7rem' }}>+ Dodaj uslugu</button></Link>
        <Link to="/admin/users"><button className="btn-outline-gold" style={{ fontSize: '0.7rem' }}>Korisnici</button></Link>
      </div>

      {/* Poslednji termini */}
      <div className="mb-3"><p className="section-title">Poslednji termini</p></div>

      {bookings.length === 0 ? (
        <div className="alert-dark-custom" style={{ textAlign: 'center', color: 'var(--gray)', fontSize: '0.8rem' }}>
          Nema zakazanih termina.
        </div>
      ) : (
        [...bookings].reverse().slice(0, 10).map((b) => (
          <div key={b._id} style={{ background: 'var(--black-card)', border: '1px solid var(--black-border)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
            <div>
              <div style={{ color: 'var(--white)', marginBottom: '0.2rem', fontFamily: 'var(--font-display)', fontSize: '1rem' }}>
                {b.service?.name}
              </div>
              <div style={{ color: 'var(--gray)', fontSize: '0.7rem' }}>
                {b.technician?.name} · {new Date(b.date).toLocaleDateString('sr-RS')} u {b.time}
              </div>
              <div style={{ color: 'var(--gray)', fontSize: '0.7rem' }}>
                {b.user?.name} — {b.user?.email}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--gold)', marginBottom: '0.3rem' }}>
                {b.service?.price?.toLocaleString('sr-RS')} RSD
              </div>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: STATUS_COLORS[b.status] || 'var(--gray)', border: `1px solid ${STATUS_COLORS[b.status] || 'var(--gray)'}`, padding: '0.15rem 0.5rem', borderRadius: 'var(--radius)', display: 'inline-block', marginBottom: '0.3rem' }}>
                {b.status}
              </div>
              {b.isPaid && (
                <div style={{ fontSize: '0.6rem', color: '#6fcf97', letterSpacing: '0.05em' }}>
                  ✓ Plaćeno
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </Container>
  );
};

export default AdminDashboardScreen;