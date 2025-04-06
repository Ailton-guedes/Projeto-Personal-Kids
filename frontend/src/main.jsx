import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Root from "./routes/route.jsx";
import './index.css';

createRoot(document.getElementById('root')
).render(
  <StrictMode>
    <Root />
  </StrictMode>
);