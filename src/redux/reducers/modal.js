import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
};

export default createSlice({
  name: 'modal',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase('ADD_CHANNEL_MODAL_OPEN', (state, action) => (
        { isOpened: true, type: 'addChannel' }
      ))
      .addCase('RENAME_CHANNEL_MODAL_OPEN', (state, action) => (
        { isOpened: true, type: 'renameChannel', data: action.payload.data }
      ))
      .addCase('REMOVE_CHANNEL_MODAL_OPEN', (state, action) => (
        { isOpened: true, type: 'removeChannel', data: action.payload.data }
      ))
      .addCase('MODAL_CLOSE', (state, action) => (
        { isOpened: false }
      ))
      .addDefaultCase((state, action) => state);
  },
});