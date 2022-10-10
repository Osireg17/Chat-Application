import React, {useState} from 'react'
import {Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useMutation, gql } from '@apollo/client';
import {useNavigate} from 'react-router-dom'

type Props = {
    history?: any
}

const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(username: $username, email: $email, password: $password, confirmPassword: $confirmPassword) {
      email
      username
      createdAt
    }
  }
`;


const Register = (props: Props) => {
    let history = useNavigate();

  const [variables, setVariables] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''

  });

  const [errors, setErrors] = useState<any>({});

  const [registerUser, {loading}] = useMutation(REGISTER_USER, {
    update(_, __){
        history('/login');
    },
    onError(err){
      setErrors(err.graphQLErrors[0].extensions.errors);
    }
  });

  const submitRegisterForm = (e: any)   => {
    e.preventDefault();
    
    registerUser({variables});
  }

  return (
    <div>
    <Row className='bg-white py-5 justify-content-center'>
        <Col sm ={8} md = {6} lg = {6}>
          <h1 className='text-center'>Register</h1>
          <Form onSubmit={submitRegisterForm}>
          {/* Make a Form.Group for users to enter their name*/}
            <Form.Group className='mb-3'>
              <Form.Label className={errors.username && 'text-danger'}>{errors.username ?? 'Username'}</Form.Label>
              <Form.Control className={errors.username && 'is-invalid'} id='username' type="text" placeholder=" Enter username" value ={variables.username} onChange = {(e) => setVariables({...variables, username: e.target.value})}/>
            </Form.Group>
            {/* Make a Form.Group for users to enter their email*/}
          <Form.Group className="mb-3">
          <Form.Label className={errors.email && 'text-danger'}>{errors.email ?? 'Email'}</Form.Label>
            <Form.Control className={errors.email && 'is-invalid'} type="email" placeholder="Enter email" value ={variables.email} onChange = {(e) => setVariables({...variables, email: e.target.value})} />
          </Form.Group>

          {/* Make a Form.Group for users to enter their password*/}
          <Form.Group className="mb-3">
          <Form.Label className={errors.password && 'text-danger'}>{errors.password ?? 'Password'}</Form.Label>
            <Form.Control className={errors.password && 'is-invalid'} type="password" placeholder="Password" value={variables.password} onChange = {(e) => setVariables({...variables, password: e.target.value})}/>
          </Form.Group>
          
          {/* Make the confirm password Form.Group */}
          <Form.Group className="mb-3">
          <Form.Label className={errors.confirmPassword && 'text-danger'}>{errors.confirmPassword ?? 'Confirm Password'}</Form.Label>
            <Form.Control className={errors.confirmPassword && 'is-invalid'} type="password" placeholder="Confirm Password" value={variables.confirmPassword} onChange = {(e) => setVariables({...variables, confirmPassword: e.target.value})}/>
          </Form.Group>
          
          <div className="text-center">
          <Button variant="success" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Register'}
          </Button>
          <br/>
          <small>Already have an account? <a href="/login">Login</a></small>
          </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Register