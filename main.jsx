import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PersonList from './PersonList.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode><PersonList /></StrictMode>
);
