import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import BenchmarksPage from './BenchmarksPage.tsx';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BenchmarksPage />
  </StrictMode>
);
