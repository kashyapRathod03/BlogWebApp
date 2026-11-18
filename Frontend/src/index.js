import React from 'react';
import ReactDOM from 'react-dom';
import './styles/design-system.css';
import App from './App';
import AuthContextProvider from './Context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
