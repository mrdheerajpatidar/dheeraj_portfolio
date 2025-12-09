import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactLenis } from 'lenis/react';

import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactLenis
      root
      options={{
        smoothWheel: true,
        lerp: 0.12,
        wheelMultiplier: 0.9,
        duration: 1.2,
      }}
    >
    <App />
    </ReactLenis>
  </StrictMode>,
);
