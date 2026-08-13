import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Catch unhandled external third-party script errors (e.g. Disqus cross-origin access in iframe)
window.addEventListener('error', (event) => {
  if (event.message === 'Script error.' || event.filename?.includes('disqus.com') || event.message?.includes('disqus')) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

