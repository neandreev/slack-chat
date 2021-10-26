import { createAction } from '@reduxjs/toolkit';

export const closeModal = createAction('MODAL_CLOSE');

export const renameChannelModal = (data) => (
  createAction('MODAL_OPEN')({ type: 'renameChannel', data })
);

export const removeChannelModal = (data) => (
  createAction('MODAL_OPEN')({ type: 'removeChannel', data })
);

export const addChannelModal = () => (
  createAction('MODAL_OPEN')({ type: 'addChannel' })
);
