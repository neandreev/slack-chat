// @ts-check
import ReactDOM from 'react-dom';
import bundledApp from './bundledApp';
import 'core-js/stable/index';
import 'regenerator-runtime/runtime';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(bundledApp, document.querySelector('#chat'));
