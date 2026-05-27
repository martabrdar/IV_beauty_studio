import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams, Link } from 'react-router-dom';
import { FaPaypal, FaMoneyBillWave } from 'react-icons/fa';
import products from '../products_list';

const TECHNICIANS = [
  { id: 'ivana', name: 'Ivana', categories: ['Manikir', 'Spray Tan'] },
  { id: 'olga',  name: 'Olga',  categories: ['Pedikir', 'Manikir'] },
];

const TIME_SLOTS = [
  '09:00','10:30', '12:00',
  '14:00','15:30','17:00', '18:30',
];

const getBookings = () => {
  try { return JSON.parse(localStorage.getItem('iv_bookings') || '[]'); }
  catch { return []; }
};

const saveBooking = (booking) => {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem('iv_bookings', JSON.stringify(bookings));
};

const isSlotTaken = (technicianId, date, slot) => {
  return getBookings().some(
    (b) => b.technicianId === technicianId && b.date === date && b.timeSlot === slot
  );
};

// Stil za karticu koraka
const stepCard = (active) => ({
  background: 'var(--black-card)',
  border: `1px solid ${active ? 'var(--gold-dark)' : 'var(--black-border)'}`,
  borderRadius: 'var(--radius)',
  padding: '1.5rem',
  marginBottom: '0.75rem',
  transition: 'border-color 0.3s ease',
});

// Broj koraka
const StepNumber = ({ n, done }) => (
  <div style={{
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: `1px solid ${done ? 'var(--gold)' : 'var(--black-border)'}`,
    background: done ? 'var(--gold)' : 'transparent',
    color: done ? 'var(--black)' : 'var(--gray)',
    fontSize: '0.65rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.3s ease',
  }}>
    {done ? '✓' : n}
  </div>
);

const BookingScreen = () => {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('service');

  const [chosenService, setChosenService] = useState(serviceId || '');
  const [chosenTech, setChosenTech]       = useState('');
  const [date, setDate]                   = useState('');
  const [timeSlot, setTimeSlot]           = useState('');
  const [note, setNote]                   = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [submitted, setSubmitted]         = useState(false);
  const [error, setError]                 = useState('');

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => { setChosenTech(''); setTimeSlot(''); }, [chosenService]);
  useEffect(() => { setTimeSlot(''); }, [chosenTech, date]);

  const getEligibleTechs = () => {
    if (!chosenService) return [];
    const service = products.find((p) => p._id === chosenService);
    if (!service) return [];
    return TECHNICIANS.filter((t) => t.categories.includes(service.category));
  };

  const eligibleTechs    = getEligibleTechs();
  const selectedServiceObj = products.find((p) => p._id === chosenService);
  const selectedTechObj    = TECHNICIANS.find((t) => t.id === chosenTech);

  // Koji koraci su završeni
  const step1Done = !!chosenService;
  const step2Done = !!chosenTech;
  const step3Done = !!date && !!timeSlot;
  const step4Done = !!paymentMethod;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isSlotTaken(chosenTech, date, timeSlot)) {
      setError('Ovaj termin je upravo zauzet. Izaberite drugi.');
      return;
    }

    saveBooking({
      id: Date.now().toString(),
      technicianId: chosenTech,
      technicianName: selectedTechObj?.name,
      date, timeSlot,
      serviceId: chosenService,
      serviceName: selectedServiceObj?.name,
      servicePrice: selectedServiceObj?.price,
      note,
      paymentMethod,
      // paymentStatus: 'pending' — backend će ovo ažurirati
      status: 'zakazan',
    });

    // TODO: ako je paymentMethod === 'paypal', pokrenuti PayPal SDK ovde
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-page">
        <div className="form-box" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '1rem' }}>✦</div>
          <h2 style={{ marginBottom: '0.5rem' }}>Termin zakazan</h2>
          <p style={{ color: 'var(--white-dim)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
            {paymentMethod === 'paypal'
              ? 'Plaćanje putem PayPal-a biće aktivirano uskoro.'
              : 'Platićete uživo prilikom dolaska.'}
          </p>
          <p style={{ color: 'var(--gray)', fontSize: '0.75rem', marginBottom: '2rem' }}>
            Potvrda će biti poslata na vašu email adresu.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/profile"><button className="btn-gold">Moji termini</button></Link>
            <Link to="/"><button className="btn-outline-gold">Početna</button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>

          <div className="mb-4">
            <p className="section-title">Online rezervacija</p>
            <h2 className="section-heading">Zakaži termin</h2>
          </div>

          <form onSubmit={handleSubmit}>

            {/* ── KORAK 1: USLUGA ── */}
            <div style={stepCard(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: step1Done ? '1rem' : 0 }}>
                <StepNumber n={1} done={step1Done} />
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: step1Done ? 'var(--gold)' : 'var(--gray)' }}>
                  Izaberite uslugu
                </span>
                {step1Done && (
                  <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--white-dim)' }}>
                    {selectedServiceObj?.name}
                  </span>
                )}
              </div>
              {!step1Done && (
                <select
                  className="form-select mt-3"
                  value={chosenService}
                  onChange={(e) => setChosenService(e.target.value)}
                >
                  <option value="">— Izaberite uslugu —</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name} — {p.price.toLocaleString('sr-RS')} RSD
                    </option>
                  ))}
                </select>
              )}
              {step1Done && (
                <button
                  type="button"
                  onClick={() => { setChosenService(''); setChosenTech(''); setDate(''); setTimeSlot(''); setPaymentMethod(''); }}
                  style={{ background: 'none', border: 'none', color: 'var(--gray)', fontSize: '0.65rem', letterSpacing: '0.1em', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                >
                  Promeni
                </button>
              )}
            </div>

            {/* ── KORAK 2: TEHNIČAR ── */}
            {step1Done && (
              <div style={stepCard(!step2Done)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: !step2Done ? '1rem' : 0 }}>
                  <StepNumber n={2} done={step2Done} />
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: step2Done ? 'var(--gold)' : 'var(--gray)' }}>
                    Izaberite tehničara
                  </span>
                  {step2Done && (
                    <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--white-dim)' }}>
                      {selectedTechObj?.name}
                    </span>
                  )}
                </div>
                {!step2Done && (
                  <Row className="g-2 mt-1">
                    {eligibleTechs.map((tech) => (
                      <Col key={tech.id} xs={6}>
                        <button
                          type="button"
                          onClick={() => setChosenTech(tech.id)}
                          style={{
                            width: '100%',
                            padding: '0.85rem 1rem',
                            background: chosenTech === tech.id ? 'var(--gold)' : 'var(--black-soft)',
                            border: `1px solid ${chosenTech === tech.id ? 'var(--gold)' : 'var(--black-border)'}`,
                            color: chosenTech === tech.id ? 'var(--black)' : 'var(--white)',
                            borderRadius: 'var(--radius)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontFamily: 'var(--font-body)',
                            textAlign: 'center',
                          }}
                        >
                          <div style={{ fontWeight: 500, marginBottom: '0.2rem', fontSize: '0.9rem' }}>{tech.name}</div>
                          <div style={{ fontSize: '0.65rem', opacity: 0.7 }}>{tech.categories.join(', ')}</div>
                        </button>
                      </Col>
                    ))}
                  </Row>
                )}
                {step2Done && (
                  <button
                    type="button"
                    onClick={() => { setChosenTech(''); setDate(''); setTimeSlot(''); setPaymentMethod(''); }}
                    style={{ background: 'none', border: 'none', color: 'var(--gray)', fontSize: '0.65rem', letterSpacing: '0.1em', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                  >
                    Promeni
                  </button>
                )}
              </div>
            )}

            {/* ── KORAK 3: DATUM I VREME ── */}
            {step2Done && (
              <div style={stepCard(!step3Done)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: !step3Done ? '1rem' : 0 }}>
                  <StepNumber n={3} done={step3Done} />
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: step3Done ? 'var(--gold)' : 'var(--gray)' }}>
                    Datum i vreme
                  </span>
                  {step3Done && (
                    <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--white-dim)' }}>
                      {date} u {timeSlot}
                    </span>
                  )}
                </div>
                {!step3Done && (
                  <>
                    <div className="mb-3 mt-1">
                      <label className="form-label">Datum</label>
                      <input
                        type="date"
                        className="form-control"
                        value={date}
                        min={today}
                        onChange={(e) => { setDate(e.target.value); setTimeSlot(''); }}
                      />
                    </div>
                    {date && (
                      <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.75rem' }}>Vreme</label>
                        <div className="booking-grid">
                          {TIME_SLOTS.map((slot) => {
                            const taken = isSlotTaken(chosenTech, date, slot);
                            return (
                              <button
                                key={slot}
                                type="button"
                                className={`time-slot ${timeSlot === slot ? 'selected' : ''}`}
                                disabled={taken}
                                onClick={() => setTimeSlot(slot)}
                                title={taken ? 'Zauzeto' : ''}
                              >
                                {slot} {taken ? '✕' : ''}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {step3Done && (
                  <button
                    type="button"
                    onClick={() => { setDate(''); setTimeSlot(''); setPaymentMethod(''); }}
                    style={{ background: 'none', border: 'none', color: 'var(--gray)', fontSize: '0.65rem', letterSpacing: '0.1em', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                  >
                    Promeni
                  </button>
                )}
              </div>
            )}

            {/* ── KORAK 4: NAPOMENA ── */}
            {step3Done && (
              <div style={stepCard(!paymentMethod)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <StepNumber n={4} done={false} />
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray)' }}>
                    Napomena (opciono)
                  </span>
                </div>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Posebni zahtevi, alergije..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            )}

            {/* ── KORAK 5: PLAĆANJE ── */}
            {step3Done && (
              <div style={stepCard(!step4Done)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <StepNumber n={5} done={step4Done} />
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: step4Done ? 'var(--gold)' : 'var(--gray)' }}>
                    Način plaćanja
                  </span>
                </div>

                <Row className="g-2">
                  {/* PayPal */}
                  <Col xs={6}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: paymentMethod === 'paypal' ? 'rgba(201, 168, 76, 0.1)' : 'var(--black-soft)',
                        border: `1px solid ${paymentMethod === 'paypal' ? 'var(--gold)' : 'var(--black-border)'}`,
                        color: paymentMethod === 'paypal' ? 'var(--gold)' : 'var(--gray)',
                        borderRadius: 'var(--radius)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontFamily: 'var(--font-body)',
                        textAlign: 'center',
                      }}
                    >
                      <FaPaypal style={{ fontSize: '1.5rem', marginBottom: '0.4rem', display: 'block', margin: '0 auto 0.4rem' }} />
                      <div style={{ fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.2rem' }}>PayPal</div>
                      <div style={{ fontSize: '0.6rem', opacity: 0.7 }}>Plaćanje online</div>
                    </button>
                  </Col>

                  {/* Uživo */}
                  <Col xs={6}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('uzivo')}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: paymentMethod === 'uzivo' ? 'rgba(201, 168, 76, 0.1)' : 'var(--black-soft)',
                        border: `1px solid ${paymentMethod === 'uzivo' ? 'var(--gold)' : 'var(--black-border)'}`,
                        color: paymentMethod === 'uzivo' ? 'var(--gold)' : 'var(--gray)',
                        borderRadius: 'var(--radius)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontFamily: 'var(--font-body)',
                        textAlign: 'center',
                      }}
                    >
                      <FaMoneyBillWave style={{ fontSize: '1.5rem', marginBottom: '0.4rem', display: 'block', margin: '0 auto 0.4rem' }} />
                      <div style={{ fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.2rem' }}>Uživo</div>
                      <div style={{ fontSize: '0.6rem', opacity: 0.7 }}>Plaćanje pri dolasku</div>
                    </button>
                  </Col>
                </Row>

                {/* Info PayPal */}
                {paymentMethod === 'paypal' && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1rem',
                    background: 'var(--black-soft)',
                    border: '1px solid var(--black-border)',
                    borderRadius: 'var(--radius)',
                    fontSize: '0.72rem',
                    color: 'var(--gray)',
                  }}>
                    <span style={{ color: 'var(--gold)' }}>ℹ</span> PayPal plaćanje će biti aktivirano uskoro. Trenutno možete odabrati ovu opciju i biće vam naplaćeno pre termina.
                  </div>
                )}
              </div>
            )}

            {/* ── GREŠKA ── */}
            {error && (
              <div className="alert-dark-custom mb-3" style={{ color: '#eb5757', borderColor: '#eb5757' }}>
                {error}
              </div>
            )}

            {/* ── REZIME + DUGME ── */}
            {step4Done && (
              <>
                <div style={{
                  background: 'var(--black-soft)',
                  border: '1px solid var(--gold-dark)',
                  borderRadius: 'var(--radius)',
                  padding: '1rem 1.25rem',
                  marginBottom: '1rem',
                  fontSize: '0.8rem',
                  color: 'var(--white-dim)',
                }}>
                  <div style={{ color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    Rezime rezervacije
                  </div>
                  <div style={{ marginBottom: '0.2rem' }}><strong style={{ color: 'var(--white)' }}>Usluga:</strong> {selectedServiceObj?.name}</div>
                  <div style={{ marginBottom: '0.2rem' }}><strong style={{ color: 'var(--white)' }}>Tehničar:</strong> {selectedTechObj?.name}</div>
                  <div style={{ marginBottom: '0.2rem' }}><strong style={{ color: 'var(--white)' }}>Datum:</strong> {date} u {timeSlot}</div>
                  <div style={{ marginBottom: '0.2rem' }}><strong style={{ color: 'var(--white)' }}>Plaćanje:</strong> {paymentMethod === 'paypal' ? 'PayPal' : 'Uživo'}</div>
                  <div><strong style={{ color: 'var(--white)' }}>Cena:</strong> {selectedServiceObj?.price?.toLocaleString('sr-RS')} RSD</div>
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%' }}>
                  {paymentMethod === 'paypal' ? 'Nastavi na PayPal →' : 'Potvrdi rezervaciju'}
                </button>
              </>
            )}

          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.7rem', color: 'var(--gray)' }}>
            Nemate nalog?{' '}
            <Link to="/register" style={{ color: 'var(--gold)' }}>Registrujte se</Link>
            {' '}za lakše praćenje termina.
          </div>

        </Col>
      </Row>
    </Container>
  );
};

export default BookingScreen;
