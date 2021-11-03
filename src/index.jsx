// @ts-check
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import 'core-js/stable/index';
import 'regenerator-runtime/runtime';
import i18n from './i18n';
import App from './App.jsx';
import ProvideAuth from './context/ProvideAuth.jsx';
import ProvideSocket from './context/ProvideSocket.jsx';

import '../assets/application.scss';
import rootReducer from './redux/rootReducer.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const rollbarConfig = {
  accessToken: '713df683ca1a45038b1c66b5ebd734fa',
  environment: 'development',
  enabled: true,
};

const store = configureStore({ reducer: rootReducer });

const app = (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ProvideAuth>
            <ProvideSocket>
              <App />
            </ProvideSocket>
          </ProvideAuth>
        </I18nextProvider>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
);

ReactDOM.render(app, document.querySelector('#chat'));
