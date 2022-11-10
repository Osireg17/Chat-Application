import React, { Fragment } from 'react'
import { Col, Row , Button, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {gql, useQuery} from '@apollo/client'

import { useAuthDispatch } from '../context/auth'

type Props = {
  history?: any
}

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      createdAt
      imageUrl
      latestMessage {
        uuid from to content createdAt
      }
    }
  }
`
 
const Home = (props: Props) => {
  let history = useNavigate();
  const dispatch = useAuthDispatch();
  const logout = () => {
    dispatch({type: 'LOGOUT'});
    history('/login');
  }

  const {loading, data, error} = useQuery(GET_USERS)


  let usersMarkUp: any 

  if(!data || loading){
    usersMarkUp = <p>Loading...</p>
  }else if(data.getUsers.length === 0){
    usersMarkUp = <p>No users have joined yet</p>
  }else if(data.getUsers.length > 0){
    usersMarkUp = data.getUsers.map((user: any) => (
      <div className='d-flex p-4' key={user.username}>
        <Image src={user.imageUrl} roundedCircle className='mr-3' style={{width: 40, height: 40, objectFit: 'cover'}}/>
        <div>
          <p className='text-success'>{user.username}</p>
        <p className="font-weight-light">
          {user.latestMessage ? user.latestMessage.content : 'You are now connected!'}
        </p>
        </div>
      </div>
    ))
  }
  
  return (
    <Fragment>
    <Col className='bg-white justify-content-around mb-1'>
      <Link to='/register'>
        <Button variant='link'>Register</Button>
      </Link>
      <Link to='/login'>
        <Button variant='link'>Login</Button>
      </Link>
      <Button variant='link' onClick={logout}>Logout</Button>
    </Col>
    <Row className='bg-white'>
      <Col xs={4} className='p-0'>
      {usersMarkUp}
      </Col>

      <Col xs={8}>
      <p>messages</p>
      </Col>
    </Row>
    </Fragment>
  )
}

export default Home