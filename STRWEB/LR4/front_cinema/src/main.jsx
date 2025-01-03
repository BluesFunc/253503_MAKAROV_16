// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';
import './styles/forms.css';
import './styles/card.css';
import './styles/components.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App/>
);
