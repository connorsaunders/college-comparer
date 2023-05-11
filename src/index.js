// import react
import React from 'react';
import ReactDOM from 'react-dom/client';
// import app main component
import App from './App';
// import web vitals component
import reportWebVitals from './reportWebVitals';
//import CSS
import './css/Index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
