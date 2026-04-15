import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FaSpa, FaUser } from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';

const Header = () => {
  return (
    <header>
        <Navbar bg="primary" variant="dark" expand="md" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <span className="fw-bold">IV </span>
                        beauty studio
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/services">
                            <Nav.Link>
                                <FaSpa/> Usluge
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <Nav.Link>
                                <FaUser /> Prijava
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header