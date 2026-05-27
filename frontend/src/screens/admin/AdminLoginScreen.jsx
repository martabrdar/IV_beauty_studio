import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdmin } from '../../slices/AdminSlice';
// import { useAdminLoginMutation } from '../../slices/AdminApiSlice';
// ↑ Odkomentarisati kada backend bude gotov

const AdminLoginScreen = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  // TODO: zameniti sa pravim API pozivom kada backend bude gotov
  // const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // ── PRIVREMENO — do backend ──
      if (email === 'admin@ivbeauty.com' && password === 'admin123') {
        const adminData = {
          _id: 'admin_1',
          name: 'Admin',
          email,
          token: 'temp_admin_token',
          isAdmin: true,
        };
        dispatch(setAdmin(adminData));
        navigate('/admin/dashboard');
        return;
      }
      setError('Pogrešni kredencijali.');

      // ── SA BACKENDOM će biti ovako ──
      // const data = await adminLogin({ email, password }).unwrap();
      // dispatch(setAdmin(data));
      // navigate('/admin/dashboard');

    } catch (err) {
      setError(err?.data?.message || 'Greška pri prijavi.');
    }
  };

  return (
    <div className="form-page">
      <div className="form-box">

        {/* Oznaka da je admin panel */}
        <div style={{
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--gold-dark)',
          border: '1px solid var(--gold-dark)',
          padding: '0.2rem 0.75rem',
          display: 'inline-block',
          borderRadius: 'var(--radius)',
          marginBottom: '1.5rem',
        }}>
          Admin panel
        </div>

        <h2>Prijava</h2>
        <p className="form-subtitle">Samo za administratore</p>

        <div className="ornament" style={{ margin: '0 0 1.5rem' }}>
          <span style={{ fontSize: '0.8rem' }}>✦</span>
        </div>

        {error && (
          <div className="alert-dark-custom mb-3" style={{ color: '#eb5757', borderColor: '#eb5757' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email adresa</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@ivbeauty.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Lozinka</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-gold" style={{ width: '100%' }}>
            Prijavi se
          </button>
        </form>

        {/*za razvoj — ukloniti pre produkcije */}
        <div style={{
          marginTop: '2rem',
          padding: '0.75rem',
          background: 'var(--black-soft)',
          border: '1px solid var(--black-border)',
          borderRadius: 'var(--radius)',
          fontSize: '0.65rem',
          color: 'var(--gray)',
          textAlign: 'center',
        }}>
          <div style={{ marginBottom: '0.25rem', color: 'var(--gold-dark)' }}>Dev kredencijali</div>
          admin@ivbeauty.com / admin123
        </div>

      </div>
    </div>
  );
};

export default AdminLoginScreen;
