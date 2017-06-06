require('./assets/stylesheets/style.scss');

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';

render(
  (
    <Provider store={store}>
        <App />
    </Provider>
  )
  , document.getElementById('app')
);
