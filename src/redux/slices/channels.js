import { createSlice } from '@reduxjs/toolkit';
import { find, reject } from 'lodash-es';
import getData from '../actions/data.js';

const initialState = {
  channelsList: [],
  currentChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (channels, { payload }) => {
      channels.channelsList.push(payload.channel);
    },
    changeActiveChannel: (channels, { payload }) => {
      channels.currentChannelId = payload;
    },
    removeChannel: (channels, { payload }) => {
      const newChannelsList = reject(
        channels.channelsList,
        { id: payload.id },
      );

      if (payload.id === channels.currentChannelId) {
        channels.currentChannelId = 1;
      }

      channels.channelsList = newChannelsList;
    },
    renameChannel: (channels, { payload }) => {
      const channel = find(
        channels.channelsList,
        { id: payload.id },
      );
      channel.name = payload.name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (channels, { payload }) => {
        channels.channelsList = payload.channels;
      })
      .addCase(getData.rejected, (channels, { payload }) => {
        console.log(payload.error);
        return channels;
      });
  },
});

export const {
  addChannel,
  removeChannel,
  renameChannel,
  changeActiveChannel,
} = channelsSlice.actions;

export default channelsSlice;
