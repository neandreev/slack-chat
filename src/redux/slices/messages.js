import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channels.js';
import getData from '../actions/data.js';

const initialState = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    newMessage: (messages, { payload }) => (
      [...messages, payload.message]
    ),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (messages, { payload }) => {
        messages.push(...payload.messages);
      })
      .addCase(getData.rejected, (messages, { payload }) => {
        console.log(payload.error);
        return messages;
      })
      .addCase(removeChannel, (messages, { payload }) => {
        const newMessages = messages.filter(
          (message) => message.channelId !== payload.id,
        );
        return newMessages;
      });
  },
});

export const { newMessage } = messagesSlice.actions;

export default messagesSlice;
