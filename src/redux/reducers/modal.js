import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
};

export default createSlice({
  name: 'modal',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase('MODAL_OPEN', (_, action) => (
        { isOpened: true, type: action.payload.type, data: action.payload.data }
      ))
      .addCase('MODAL_CLOSE', () => (
        { isOpened: false }
      ));
  },
});
