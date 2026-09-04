import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ZylectraVsWangPage from './ZylectraVsWangPage.tsx';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ZylectraVsWangPage />
  </StrictMode>
);
