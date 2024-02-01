import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
// index.js or index.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
  
    <App />
    </Provider>
    </BrowserRouter>
    
  </React.StrictMode>
);
