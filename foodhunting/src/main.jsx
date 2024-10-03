import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Define BrowserRouter here to avoid duplicates */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);