import React, {useState} from 'react'
import { Col, Row , Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useAuthDispatch } from '../context/auth'

type Props = {
  history?: any
}

const Home = (props: Props) => {
  let history = useNavigate();
  const dispatch = useAuthDispatch();
  const logout = () => {
    dispatch({type: 'LOGOUT'});
    history('/login');
  }

  return (
    <Col className='bg-white justify-content-around'>
      <Link to='/register'>
        <Button variant='link'>Register</Button>
      </Link>
      <Link to='/login'>
        <Button variant='link'>Login</Button>
      </Link>
      <Button variant='link' onClick={logout}>Logout</Button>
    </Col>
  )
}

export default Home