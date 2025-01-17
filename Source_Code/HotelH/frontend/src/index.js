import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import App from './App';
import reportWebVitals from './reportWebVitals';

const initialOptions = {
  clientId: 'ASZf3k3wsusPbOnpo-Cd1hvjWwTB0oXZ2GCFtBmt7SvfZqOHvy8Ii9X3EfwCY4cuK7-VIAZQc-qoxzFv', // client ID Paypal Sandbox
  currency: 'USD',
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PayPalScriptProvider options={initialOptions}>
        <App />
    </PayPalScriptProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
