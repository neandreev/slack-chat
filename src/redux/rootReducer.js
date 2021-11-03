import { combineReducers } from '@reduxjs/toolkit';
import channels from './slices/channels.js';
import messages from './slices/messages.js';
import modal from './slices/modal.js';

export default combineReducers({
  channels: channels.reducer,
  messages: messages.reducer,
  modal: modal.reducer,
});
