import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { theme } from './theme';
import { CookiesProvider } from 'react-cookie';
ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
