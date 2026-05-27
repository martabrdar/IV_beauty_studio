import React from 'react';
import { Container } from 'react-bootstrap';
import { FaSpa } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontStyle: 'italic' }}>IV</span>{' '}
            beauty studio
          </div>
          <div>
            <FaSpa style={{ color: 'var(--gold)', marginRight: '6px' }} />
            Lepota je umetnost
          </div>
          <div>
            &copy; {currentYear} IV beauty studio
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
