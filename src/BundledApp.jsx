import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { configureStore } from '@reduxjs/toolkit';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import ProvideSocket from './context/ProvideSocket.jsx';
import ProvideAuth from './context/ProvideAuth.jsx';
import rootReducer from './redux/rootReducer.js';
import App from './App.jsx';
import i18n from './i18n';

import '../assets/application.scss';

const store = configureStore({ reducer: rootReducer });

const rollbarConfig = {
  accessToken: '713df683ca1a45038b1c66b5ebd734fa',
  environment: 'development',
  enabled: true,
};

const BundledApp = () => (
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

export default BundledApp;
