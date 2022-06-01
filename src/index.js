import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { GlobalProvider } from './components/Context';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
    <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


