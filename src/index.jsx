import React from 'react';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

async function boot() {
  try {
    const ReactDOMClient = await import('react-dom/client');
    const root = ReactDOMClient.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    // Fallback for environments where react-dom/client isn't available
    const ReactDOM = await import('react-dom');
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      rootElement
    );
  }
}

boot();