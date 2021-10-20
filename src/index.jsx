// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(<App />, document.querySelector('#chat'));
