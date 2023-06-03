// import react
import React from 'react';
import ReactDOM from 'react-dom/client';
// import app main component
import App from './App';
//import CSS
import './css/Index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
