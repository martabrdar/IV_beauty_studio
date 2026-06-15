import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin } from '../../slices/AdminSlice';
import { useAdminLoginMutation } from '../../slices/AdminApiSlice';

const AdminLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const { adminInfo } = useSelector((state) => state.admin);

  useEffect(() => {
    if (adminInfo) navigate('/admin/dashboard');
  }, [adminInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await adminLogin({ email, password }).unwrap();
      dispatch(setAdmin(data));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err?.data?.message || 'Pogrešni kredencijali.');
    }
  };

  return (
    <div className="form-page">
      <div className="form-box">
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-dark)', border: '1px solid var(--gold-dark)', padding: '0.2rem 0.75rem', display: 'inline-block', borderRadius: 'var(--radius)', marginBottom: '1.5rem' }}>
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
            <input type="email" className="form-control" placeholder="admin@ivbeautystudio.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="form-label">Lozinka</label>
            <input type="password" className="form-control" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-gold" style={{ width: '100%' }} disabled={isLoading}>
            {isLoading ? 'Učitavanje...' : 'Prijavi se'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginScreen;