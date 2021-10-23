import { combineReducers } from '@reduxjs/toolkit';
import data from './reducers/data.js';
import modal from './reducers/modal.js';

export default combineReducers({
  data: data.reducer,
  modal: modal.reducer,
});
