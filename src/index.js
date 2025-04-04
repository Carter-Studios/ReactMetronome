import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Prevent default touch behaviors to make app feel more native
document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

// Prevent zoom on double tap
document.addEventListener('dblclick', (e) => {
  e.preventDefault();
}, { passive: false });

// Prevent context menu on long press
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
