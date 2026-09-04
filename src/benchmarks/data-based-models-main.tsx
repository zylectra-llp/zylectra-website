import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DataBasedModelsPage from './DataBasedModelsPage.tsx';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataBasedModelsPage />
  </StrictMode>
);
