import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetServicesQuery, useDeleteServiceMutation, useCreateServiceMutation } from '../../slices/ServicesApiSlice';

const AdminServicesScreen = () => {
  const navigate = useNavigate();
  const { adminInfo } = useSelector((state) => state.admin);

  const { data: services, refetch } = useGetServicesQuery();
  const [deleteService] = useDeleteServiceMutation();
  const [createService] = useCreateServiceMutation();

  const [showForm, setShowForm] = useState(false);
  const [newService, setNewService] = useState({ name: '', description: '', price: '', category: '', duration: '' });
  const [error, setError] = useState('');

  if (!adminInfo) { navigate('/admin/login'); return null; }

  const handleDelete = async (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovu uslugu?')) {
      try {
        await deleteService(id).unwrap();
        refetch();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createService({
        ...newService,
        price: Number(newService.price),
        duration: Number(newService.duration),
      }).unwrap();
      setNewService({ name: '', description: '', price: '', category: '', duration: '' });
      setShowForm(false);
      refetch();
    } catch (err) {
      setError(err?.data?.message || 'Greška pri dodavanju usluge.');
    }
  };

  return (
    <Container className="py-5">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <p className="section-title">Admin panel</p>
          <h2 className="section-heading">Upravljanje uslugama</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/admin/dashboard">
            <button className="btn-outline-gold" style={{ fontSize: '0.65rem', padding: '0.5rem 1rem' }}>← Dashboard</button>
          </Link>
          <button className="btn-gold" style={{ fontSize: '0.65rem' }} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Otkaži' : '+ Nova usluga'}
          </button>
        </div>
      </div>

      {/* Forma za novu uslugu */}
      {showForm && (
        <div style={{ background: 'var(--black-card)', border: '1px solid var(--gold-dark)', borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '2rem' }}>
          <p className="section-title" style={{ marginBottom: '1rem' }}>Nova usluga</p>
          {error && <div className="alert-dark-custom mb-3" style={{ color: '#eb5757', borderColor: '#eb5757' }}>{error}</div>}
          <form onSubmit={handleCreate}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label">Naziv</label>
                <input type="text" className="form-control" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} required />
              </div>
              <div>
                <label className="form-label">Kategorija</label>
                <select className="form-select" value={newService.category} onChange={(e) => setNewService({ ...newService, category: e.target.value })} required>
                  <option value="">— Izaberi —</option>
                  <option value="Manikir">Manikir</option>
                  <option value="Pedikir">Pedikir</option>
                  <option value="Spray Tan">Spray Tan</option>
                </select>
              </div>
              <div>
                <label className="form-label">Cena (RSD)</label>
                <input type="number" className="form-control" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} required />
              </div>
              <div>
                <label className="form-label">Trajanje (min)</label>
                <input type="number" className="form-control" value={newService.duration} onChange={(e) => setNewService({ ...newService, duration: e.target.value })} required />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Opis</label>
                <textarea className="form-control" rows={2} value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} required />
              </div>
            </div>
            <button type="submit" className="btn-gold" style={{ marginTop: '1rem', fontSize: '0.75rem' }}>Sačuvaj uslugu</button>
          </form>
        </div>
      )}

      {/* Tabela usluga */}
      <div style={{ background: 'var(--black-card)', border: '1px solid var(--black-border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '1rem', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--black-border)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray)' }}>
          <div>Naziv</div>
          <div>Kategorija</div>
          <div>Cena</div>
          <div>Akcije</div>
        </div>

        {services?.map((service) => (
          <div key={service._id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '1rem', padding: '1rem 1.25rem', borderBottom: '1px solid var(--black-border)', alignItems: 'center', fontSize: '0.8rem' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--black-soft)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            <div style={{ color: 'var(--white)', fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>{service.name}</div>
            <div><span className="category-badge">{service.category}</span></div>
            <div style={{ color: 'var(--gold)' }}>{service.price?.toLocaleString('sr-RS')} RSD</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                style={{ background: 'transparent', border: '1px solid var(--black-border)', color: 'var(--gray)', fontSize: '0.6rem', letterSpacing: '0.1em', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius)', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                onMouseEnter={(e) => { e.target.style.borderColor = '#eb5757'; e.target.style.color = '#eb5757'; }}
                onMouseLeave={(e) => { e.target.style.borderColor = 'var(--black-border)'; e.target.style.color = 'var(--gray)'; }}
                onClick={() => handleDelete(service._id)}>
                Obriši
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default AdminServicesScreen;