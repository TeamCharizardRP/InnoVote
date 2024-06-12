import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store.js';
import App from './App.jsx';
import '../src/styles/styles.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
