import React, {useState} from 'react'
import {Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useQuery, gql, useLazyQuery } from '@apollo/client'
import {useNavigate} from 'react-router-dom'
// create login page that is similar to register page but with a few differences
// 1. use login mutation instead of register mutation
// 2. remove confirm password field
// 3. remove email field

import { useAuthDispatch } from '../context/auth';



const LOGIN_USER = gql`
    query login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            email
            username
            createdAt
            token
        }
    }
`;

type Props = {
    history?: any
}

const Login = (props: Props) => {
    let history = useNavigate();
    const [variables, setVariables] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState<any>({});

    const dispatch = useAuthDispatch()// useAuthDispatch is a custom hook that returns the dispatch function from the AuthProvider

    const [loginUser, {loading}] = useLazyQuery(LOGIN_USER, {
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        onCompleted(data){
            localStorage.setItem('token', data.login.token);
            dispatch({type: 'LOGIN', payload: data.login});
            history('/');
        }
    });

    const submitLoginForm = (e: any) => {
        e.preventDefault();
    
        loginUser({variables});
    }



  return (
    <div>
    <Row className='bg-white py-5 justify-content-center'>
        <Col sm ={8} md = {6} lg = {6}>
            <h1 className='text-center'>Login</h1>
            <Form onSubmit={submitLoginForm}>
                <Form.Group className='mb-3'>
                    <Form.Label className={errors.username && 'text-danger'}>{errors.username ?? 'Username'}</Form.Label>
                    <Form.Control className={errors.username && 'is-invalid'} id='username' type="text" placeholder=" Enter username" value ={variables.username} onChange = {(e) => setVariables({...variables, username: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={errors.password && 'text-danger'}>{errors.password ?? 'Password'}</Form.Label>
                    <Form.Control className={errors.password && 'is-invalid'} id='password' type="password" placeholder=" Enter password" value ={variables.password} onChange = {(e) => setVariables({...variables, password: e.target.value})}/>
                </Form.Group>
                <div className='text-center'>
                    <Button variant='success' type='submit' disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </Button>
                    <br/>
                    <small>Don't have an account? <a href='/register'>Register</a></small>
                </div>
            </Form>
        </Col>
    </Row>
    </div>
  )
}

export default Login;