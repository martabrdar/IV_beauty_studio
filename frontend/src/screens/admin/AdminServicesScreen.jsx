import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminServicesScreen = () => {
  const navigate = useNavigate();
  const { adminInfo } = useSelector((state) => state.admin);

  const [services, setServices] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({ name: '', description: '', price: '', category: '', duration: '', image: '' });
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [error, setError] = useState('');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${adminInfo?.token}`,
  };

  useEffect(() => {
    if (!adminInfo) { navigate('/admin/login'); return; }
    fetchServices();
    fetchTechnicians();
  }, [adminInfo, navigate]);

  const fetchServices = () => {
    fetch('http://localhost:5000/api/services')
      .then((r) => r.json())
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  };

  const fetchTechnicians = () => {
    fetch('http://localhost:5000/api/technicians')
      .then((r) => r.json())
      .then((data) => setTechnicians(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  };

  const handleTechToggle = (techId) => {
    setSelectedTechs((prev) =>
      prev.includes(techId) ? prev.filter((id) => id !== techId) : [...prev, techId]
    );
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setNewService({
      name: service.name,
      description: service.description,
      price: service.price,
      category: service.category,
      duration: service.duration,
      image: service.image || '',
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovu uslugu?')) {
      fetch(`http://localhost:5000/api/services/${id}`, {
        method: 'DELETE',
        headers,
      })
        .then(() => setServices(services.filter((s) => s._id !== id)))
        .catch((err) => console.error(err));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const url = editingService
      ? `http://localhost:5000/api/services/${editingService._id}`
      : 'http://localhost:5000/api/services';
    const method = editingService ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers,
      body: JSON.stringify({
        ...newService,
        price: Number(newService.price),
        duration: Number(newService.duration),
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.message && !data._id) {
          setError(data.message);
        } else {
          if (editingService) {
            setServices(services.map((s) => s._id === data._id ? data : s));
          } else {
            if (selectedTechs.length > 0) {
              selectedTechs.forEach((techId) => {
                const tech = technicians.find((t) => t._id === techId);
                if (tech) {
                  fetch(`http://localhost:5000/api/technicians/${techId}`, {
                    method: 'PUT',
                    headers,
                    body: JSON.stringify({
                      services: [...(tech.services || []), data._id],
                    }),
                  });
                }
              });
            }
            setServices([...services, data]);
          }
          setNewService({ name: '', description: '', price: '', category: '', duration: '', image: '' });
          setSelectedTechs([]);
          setEditingService(null);
          setShowForm(false);
        }
      })
      .catch(() => setError('Greška pri čuvanju usluge.'));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingService(null);
    setNewService({ name: '', description: '', price: '', category: '', duration: '', image: '' });
    setError('');
  };

  if (!adminInfo) return null;

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
          <button className="btn-gold" style={{ fontSize: '0.65rem' }} onClick={() => { setEditingService(null); setNewService({ name: '', description: '', price: '', category: '', duration: '', image: '' }); setShowForm(!showForm); }}>
            {showForm ? 'Otkaži' : '+ Nova usluga'}
          </button>
        </div>
      </div>

      {showForm && (
        <div style={{ background: 'var(--black-card)', border: '1px solid var(--gold-dark)', borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '2rem' }}>
          <p className="section-title" style={{ marginBottom: '1rem' }}>
            {editingService ? 'Izmeni uslugu' : 'Nova usluga'}
          </p>
          {error && <div className="alert-dark-custom mb-3" style={{ color: '#eb5757', borderColor: '#eb5757' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
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
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">URL slike (opciono)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://..."
                  value={newService.image}
                  onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                />
                {newService.image && (
                  <img
                    src={newService.image}
                    alt="preview"
                    style={{ marginTop: '0.5rem', width: '100px', height: '70px', objectFit: 'cover', borderRadius: 'var(--radius)', border: '1px solid var(--black-border)' }}
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
              </div>
              {!editingService && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Tehničari koji izvršavaju uslugu</label>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                    {technicians.map((tech) => (
                      <button
                        key={tech._id}
                        type="button"
                        onClick={() => handleTechToggle(tech._id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: selectedTechs.includes(tech._id) ? 'var(--gold)' : 'var(--black-soft)',
                          border: `1px solid ${selectedTechs.includes(tech._id) ? 'var(--gold)' : 'var(--black-border)'}`,
                          color: selectedTechs.includes(tech._id) ? 'var(--black)' : 'var(--white)',
                          borderRadius: 'var(--radius)',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-body)',
                          transition: 'all 0.3s ease',
                        }}>
                        {tech.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button type="submit" className="btn-gold" style={{ fontSize: '0.75rem' }}>
                {editingService ? 'Sačuvaj izmene' : 'Sačuvaj uslugu'}
              </button>
              <button type="button" className="btn-outline-gold" style={{ fontSize: '0.75rem' }} onClick={handleCancel}>
                Otkaži
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabela usluga */}
      <div style={{ background: 'var(--black-card)', border: '1px solid var(--black-border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '60px 2fr 1fr 1fr auto', gap: '1rem', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--black-border)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray)' }}>
          <div>Slika</div>
          <div>Naziv</div>
          <div>Kategorija</div>
          <div>Cena</div>
          <div>Akcije</div>
        </div>

        {services.map((service) => (
          <div key={service._id} style={{ display: 'grid', gridTemplateColumns: '60px 2fr 1fr 1fr auto', gap: '1rem', padding: '1rem 1.25rem', borderBottom: '1px solid var(--black-border)', alignItems: 'center', fontSize: '0.8rem' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--black-soft)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            <div>
              {service.image ? (
                <img src={service.image} alt={service.name} style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: 'var(--radius)' }} onError={(e) => e.target.style.display = 'none'} />
              ) : (
                <div style={{ width: '50px', height: '40px', background: 'var(--black-border)', borderRadius: 'var(--radius)' }} />
              )}
            </div>
            <div style={{ color: 'var(--white)', fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>{service.name}</div>
            <div><span className="category-badge">{service.category}</span></div>
            <div style={{ color: 'var(--gold)' }}>{service.price?.toLocaleString('sr-RS')} RSD</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                style={{ background: 'transparent', border: '1px solid var(--black-border)', color: 'var(--gray)', fontSize: '0.6rem', letterSpacing: '0.1em', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius)', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                onMouseEnter={(e) => { e.target.style.borderColor = 'var(--gold)'; e.target.style.color = 'var(--gold)'; }}
                onMouseLeave={(e) => { e.target.style.borderColor = 'var(--black-border)'; e.target.style.color = 'var(--gray)'; }}
                onClick={() => handleEdit(service)}>
                Izmeni
              </button>
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

        {services.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray)', fontSize: '0.8rem' }}>
            Nema usluga.
          </div>
        )}
      </div>
    </Container>
  );
};

export default AdminServicesScreen;