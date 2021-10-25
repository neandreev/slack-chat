import { createAction } from '@reduxjs/toolkit';

export const closeModal = createAction('MODAL_CLOSE');

export const renameChannelModal = (data) => createAction('RENAME_CHANNEL_MODAL_OPEN')({ data });

export const removeChannelModal = (data) => createAction('REMOVE_CHANNEL_MODAL_OPEN')({ data });

export const addChannelModal = createAction('ADD_CHANNEL_MODAL_OPEN');
