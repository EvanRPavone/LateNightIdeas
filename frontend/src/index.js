import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { IdeasContextProvider } from './context/IdeaContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IdeasContextProvider>
      <App />
    </IdeasContextProvider>
  </React.StrictMode>
);
