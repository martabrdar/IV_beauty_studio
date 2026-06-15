import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/UsersApiSlice';
import { setUser } from '../slices/UserSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setUser(res));
      navigate('/');
    } catch (err) {
      setError(err?.data?.message || 'Greška pri prijavi');
    }
  };

  return (
    <div className="form-page">
      <div className="form-box">
        <h2>Dobrodošli</h2>
        <p className="form-subtitle">Prijavite se na nalog</p>

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
              placeholder="vas@email.com"
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

          <button 
            type="submit" 
            className="btn-gold" 
            style={{ width: '100%', marginBottom: '1rem' }}
            disabled={isLoading}
          >
            {isLoading ? 'Učitavanje...' : 'Prijavi se'}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--gray)', marginTop: '1.5rem' }}>
          Nemate nalog?{' '}
          <Link to="/register" style={{ color: 'var(--gold)' }}>
            Registrujte se
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;