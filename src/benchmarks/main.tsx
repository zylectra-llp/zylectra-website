import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HubPage from './HubPage.tsx';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HubPage />
  </StrictMode>
);
