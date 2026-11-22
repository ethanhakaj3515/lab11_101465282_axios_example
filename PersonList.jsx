import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const USERS_URL = 'https://randomuser.me/api/?results=10';

export default function PersonList() {
  const [persons, setPersons] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadPersons() {
      try {
        const { data } = await axios.get(USERS_URL, { signal: controller.signal });
        setPersons(data.results);
      } catch (requestError) {
        if (!axios.isCancel(requestError)) setError('Unable to load people. Please reload to try again.');
      }
    }

    loadPersons();
    return () => controller.abort();
  }, []);

  return (
    <Container as="main" className="py-5">
      <h1 className="mb-4">People directory</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {!error && !persons && <Spinner animation="border" role="status"><span className="visually-hidden">Loading people</span></Spinner>}
      <Row xs={1} sm={2} lg={3} className="g-3">
        {persons?.map((person) => (
          <Col key={person.login.uuid}>
            <Card className="h-100">
              <Card.Body className="d-flex align-items-center gap-3">
                <img src={person.picture.medium} alt="" width="64" height="64" className="rounded-circle" />
                <div className="text-break">
                  <Card.Title>{person.name.first} {person.name.last}</Card.Title>
                  <Card.Text className="mb-0">{person.email}</Card.Text>
                  <Card.Text className="text-secondary">{person.location.city}, {person.location.country}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
