import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminUsersScreen = () => {
  const navigate = useNavigate();
  const { adminInfo } = useSelector((state) => state.admin);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!adminInfo) {
      navigate('/admin/login');
      return;
    }

    fetch('http://localhost:5000/api/admin/users', {
      headers: {
        'Authorization': `Bearer ${adminInfo.token}`,
      },
    })
      .then((r) => r.json())
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, [adminInfo, navigate]);

  if (!adminInfo) return null;

  return (
    <Container className="py-5">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <p className="section-title">Admin panel</p>
          <h2 className="section-heading">Korisnici</h2>
        </div>
        <Link to="/admin/dashboard">
          <button className="btn-outline-gold" style={{ fontSize: '0.65rem', padding: '0.5rem 1rem' }}>← Dashboard</button>
        </Link>
      </div>

      <div style={{ background: 'var(--black-card)', border: '1px solid var(--black-border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr auto', gap: '1rem', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--black-border)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray)' }}>
          <div>Ime</div>
          <div>Email</div>
          <div>Admin</div>
          <div>Akcije</div>
        </div>

        {users.map((user) => (
          <div key={user._id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr auto', gap: '1rem', padding: '1rem 1.25rem', borderBottom: '1px solid var(--black-border)', alignItems: 'center', fontSize: '0.8rem' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--black-soft)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            <div style={{ color: 'var(--white)' }}>{user.name}</div>
            <div style={{ color: 'var(--gray)' }}>{user.email}</div>
            <div style={{ color: user.isAdmin ? 'var(--gold)' : 'var(--gray)' }}>
              {user.isAdmin ? 'Da' : 'Ne'}
            </div>
            <div>
              <button
                style={{ background: 'transparent', border: '1px solid var(--black-border)', color: 'var(--gray)', fontSize: '0.6rem', letterSpacing: '0.1em', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius)', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                onMouseEnter={(e) => { e.target.style.borderColor = '#eb5757'; e.target.style.color = '#eb5757'; }}
                onMouseLeave={(e) => { e.target.style.borderColor = 'var(--black-border)'; e.target.style.color = 'var(--gray)'; }}
                onClick={() => {
                  if (window.confirm('Da li ste sigurni da želite da obrišete ovog korisnika?')) {
                    fetch(`http://localhost:5000/api/admin/users/${user._id}`, {
                      method: 'DELETE',
                      headers: { 'Authorization': `Bearer ${adminInfo.token}` },
                    }).then(() => setUsers(users.filter((u) => u._id !== user._id)));
                  }
                }}>
                Obriši
              </button>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray)', fontSize: '0.8rem' }}>
            Nema korisnika.
          </div>
        )}
      </div>
    </Container>
  );
};

export default AdminUsersScreen;