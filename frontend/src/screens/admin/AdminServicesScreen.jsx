import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import products from '../../products_list';
// import { useGetServicesQuery, useDeleteServiceMutation, useCreateServiceMutation } from '../../slices/servicesApiSlice';


const AdminServicesScreen = () => {
  const navigate = useNavigate();
  const { adminInfo } = useSelector((state) => state.admin);

  if (!adminInfo) { navigate('/admin/login'); return null; }

  // Privremeno — useGetServicesQuery()
  const services = products;

  return (
    <Container className="py-5">

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <p className="section-title">Admin panel</p>
          <h2 className="section-heading">Upravljanje uslugama</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/admin/dashboard">
            <button className="btn-outline-gold" style={{ fontSize: '0.65rem', padding: '0.5rem 1rem' }}>← Dashboard</button>
          </Link>
          <button className="btn-gold" style={{ fontSize: '0.65rem' }}>
            + Nova usluga
            {/* TODO: otvoriti modal ili navigirati na /admin/services/new */}
          </button>
        </div>
      </div>

      {/* Tabela usluga */}
      <div style={{ background: 'var(--black-card)', border: '1px solid var(--black-border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>

        {/* Header tabele */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
          gap: '1rem',
          padding: '0.75rem 1.25rem',
          borderBottom: '1px solid var(--black-border)',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--gray)',
        }}>
          <div>Naziv</div>
          <div>Kategorija</div>
          <div>Cena</div>
          <div>Termini</div>
          <div>Akcije</div>
        </div>

        {/* Redovi */}
        {services.map((service) => (
          <div key={service._id} style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
            gap: '1rem',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--black-border)',
            alignItems: 'center',
            fontSize: '0.8rem',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--black-soft)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div>
              <div style={{ color: 'var(--white)', fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>
                {service.name}
              </div>
            </div>
            <div>
              <span className="category-badge">{service.category}</span>
            </div>
            <div style={{ color: 'var(--gold)' }}>
              {service.price.toLocaleString('sr-RS')} RSD
            </div>
            <div style={{ color: service.countInStock > 0 ? '#6fcf97' : '#eb5757', fontSize: '0.75rem' }}>
              {service.countInStock > 0 ? `${service.countInStock} slobodnih` : 'Nema termina'}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                style={{
                  background: 'transparent',
                  border: '1px solid var(--black-border)',
                  color: 'var(--gray)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.target.style.borderColor = 'var(--gold)'; e.target.style.color = 'var(--gold)'; }}
                onMouseLeave={(e) => { e.target.style.borderColor = 'var(--black-border)'; e.target.style.color = 'var(--gray)'; }}
                onClick={() => {
                  // TODO: navigate(`/admin/services/${service._id}/edit`)
                  alert('Izmena usluge — dostupno sa backendom');
                }}
              >
                Izmeni
              </button>
              <button
                style={{
                  background: 'transparent',
                  border: '1px solid var(--black-border)',
                  color: 'var(--gray)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.target.style.borderColor = '#eb5757'; e.target.style.color = '#eb5757'; }}
                onMouseLeave={(e) => { e.target.style.borderColor = 'var(--black-border)'; e.target.style.color = 'var(--gray)'; }}
                onClick={() => {
                  // TODO: deleteService(service._id)
                  alert('Brisanje usluge — dostupno sa backendom');
                }}
              >
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
