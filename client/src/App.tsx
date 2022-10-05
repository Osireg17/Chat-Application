import React from 'react';
import {Container} from 'react-bootstrap';

import ApolloProvider from './Apollo/ApolloProvider';

import './App.scss';
import Register from './Components/Register';


function App() {
  return (
    <ApolloProvider>
    <Container className='pt-5'>
      <Register />
    </Container>
    </ApolloProvider>
  );
}

export default App;
