import React from 'react';
import styled from 'styled-components';
import Header from './Components/Header';
import Router from './Router';
import { theme } from './theme';

const App = () => {
  return (
    <>
      <Header />
      <Router />
    </>
  );
};

export default App;
