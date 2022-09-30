import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './App.scss';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Register</h1>
          <Form>
          {/* Make a Form.Group for users to enter their name*/}
            <Form.Group className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder=" Enter username" />
            </Form.Group>
            {/* Make a Form.Group for users to enter their email*/}
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          {/* Make a Form.Group for users to enter their password*/}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"/>
          </Form.Group>
          
          {/* Make the confirm password Form.Group */}
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>
          
          <div className="text-center">
          <Button variant="success" type="submit">
            Register
          </Button>
          </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
