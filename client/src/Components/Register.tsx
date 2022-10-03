import React, {useState} from 'react'
import {Card, Container, Row, Col, Form, Button } from 'react-bootstrap';

type Props = {}

const Register = (props: Props) => {

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
    <div>
    <Row className='bg-white py-5 justify-content-center'>
        <Col sm ={8} md = {6} lg = {6}>
          <h1 className='text-center'>Register</h1>
          <Form onSubmit={submitRegisterForm}>
          {/* Make a Form.Group for users to enter their name*/}
            <Form.Group className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control id='username' type="text" placeholder=" Enter username" value ={variables.username} onChange = {(e) => setVariables({...variables, username: e.target.value})}/>
            </Form.Group>
            {/* Make a Form.Group for users to enter their email*/}
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value ={variables.email} onChange = {(e) => setVariables({...variables, email: e.target.value})} />
          </Form.Group>

          {/* Make a Form.Group for users to enter their password*/}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={variables.password} onChange = {(e) => setVariables({...variables, password: e.target.value})}/>
          </Form.Group>
          
          {/* Make the confirm password Form.Group */}
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" value={variables.confirmPassword} onChange = {(e) => setVariables({...variables, confirmPassword: e.target.value})}/>
          </Form.Group>
          
          <div className="text-center">
          <Button variant="success" type="submit">
            Register
          </Button>
          </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Register