// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import { BundledApp } from './BundledApp';
import 'core-js/stable/index';
import 'regenerator-runtime/runtime';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(<BundledApp />, document.querySelector('#chat'));
