import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';

import './index.css';

import Layout from './layouts/Layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>
);

