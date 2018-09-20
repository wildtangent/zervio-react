import './polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import configureStore from './store/configureStore';

import './index.css';
import App from './App';

// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// disable ServiceWorker
// registerServiceWorker();
