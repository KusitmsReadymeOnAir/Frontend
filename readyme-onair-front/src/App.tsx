import React from 'react';
import { ModalProvider } from 'styled-react-modal';
import Header from './Components/Header';
import Router from './Router';

const App: React.FC = () => {
  return (
    <>
      <ModalProvider>
        <Header />
        <Router />
      </ModalProvider>
    </>
  );
};

export default App;
