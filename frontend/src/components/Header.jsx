import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FaSpa, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header>
      <Navbar expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <span className="brand-accent">IV</span> beauty studio
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="main-nav" />

          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto align-items-md-center">
              <LinkContainer to="/services">
                <Nav.Link className={location.pathname === '/services' ? 'active' : ''}>
                  <FaSpa style={{ marginRight: '6px', fontSize: '0.8rem' }} />
                  Usluge
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/booking">
                <Nav.Link className={location.pathname === '/booking' ? 'active' : ''}>
                  <FaCalendarAlt style={{ marginRight: '6px', fontSize: '0.8rem' }} />
                  Zakaži
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/profile">
                <Nav.Link className={location.pathname === '/profile' ? 'active' : ''}>
                  <FaUser style={{ marginRight: '6px', fontSize: '0.8rem' }} />
                  Profil
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
