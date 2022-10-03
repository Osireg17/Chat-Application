import React, {useState} from 'react';
import {Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import './App.scss';
import Register from './Components/Register';

function App() {

  const [variables, setVariables] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''

  });

  const submitRegisterForm = (e: any)   => {
    e.preventDefault();
    console.log('submitRegisterForm');
  }

  return (
    <Container className='pt-5'>
      <Register />
    </Container>
  );
}

export default App;
