import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './root.jsx';
import './index.css';
import { UserProvider } from './service/UserContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
