import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (modal, { payload }) => (
      { ...modal, ...payload, isOpened: true }
    ),
    closeModal: () => (
      { isOpened: false }
    ),
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice;
