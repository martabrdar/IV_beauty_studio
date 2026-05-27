import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Priprema za backend — ovde će ići API poziv
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
    // TODO: dispatch(login(email, password))
    // navigate('/');
  };

  return (
    <div className="form-page">
      <div className="form-box">
        <h2>Dobrodošli</h2>
        <p className="form-subtitle">Prijavite se na nalog</p>

        <div className="ornament" style={{ margin: '0 0 1.5rem' }}>
          <span style={{ fontSize: '0.8rem' }}>✦</span>
        </div>

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

          <button type="submit" className="btn-gold" style={{ width: '100%', marginBottom: '1rem' }}>
            Prijavi se
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
