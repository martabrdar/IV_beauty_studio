import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetServicesQuery } from '../slices/ServicesApiSlice';
import Product from '../components/Product';

const HomeScreen = () => {
  const { data: services, isLoading } = useGetServicesQuery();
  const featured = services ? services.slice(0, 4) : [];

  return (
    <>
      <div className="hero">
        <Container>
          <p className="hero-subtitle">Dobrodošli u</p>
          <h1>IV <em>beauty</em> studio</h1>
          <div className="hero-divider" />
          <p>
            Profesionalni tretmani manikira, pedikira i spray tana u opuštenoj i
            elegantnoj atmosferi. Vaša lepota je naša strast.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/services"><button className="btn-gold">Pogledaj usluge</button></Link>
            <Link to="/booking"><button className="btn-outline-gold">Zakaži termin</button></Link>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        <div className="text-center mb-4">
          <p className="section-title">Naše usluge</p>
          <h2 className="section-heading">Istaknuti tretmani</h2>
        </div>

        {isLoading ? (
          <p style={{ color: 'var(--gray)', textAlign: 'center' }}>Učitavanje...</p>
        ) : (
          <Row>
            {featured.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={3} className="mb-4">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}

        <div className="text-center mt-2">
          <Link to="/services"><button className="btn-outline-gold">Sve usluge →</button></Link>
        </div>
      </Container>

      <div style={{ borderTop: '1px solid var(--black-border)', borderBottom: "1px solid var(--black-border)", backgroundColor: "var(--black-soft)" }}>
        <Container className="py-4">
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            {[
              { broj: '200+', tekst: 'Zadovoljnih klijenata' },
              { broj: '6+', tekst: 'Godine iskustva' },
              { broj: '100%', tekst: 'Prirodni preparati' },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--gold)' }}>{item.broj}</div>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray)', marginTop: '0.5rem' }}>{item.tekst}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomeScreen;