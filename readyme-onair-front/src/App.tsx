import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from 'styled-react-modal';
import Header from './Components/Header';
import Router from './Router';

const App: React.FC = () => {
  return (
    <>
    <BrowserRouter>
    <ModalProvider>
        <Header />
        <Router />
      </ModalProvider>
    </BrowserRouter>
     
    </>
  );
};

export default App;
