import React from 'react';
import {Container} from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link  } from 'react-router-dom';

import ApolloProvider from './Apollo/ApolloProvider';

import './App.scss';
import Register from './Components/Register';
import Home from './Components/Home';
import Login from './Components/Login';


import { AuthProvider } from './context/auth';
import DynamicRoutes from './util/DynamicRoutes';


function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
      <BrowserRouter>
        <Container className='pt-5'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Container>
      </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
