import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import getData from '../actions/data.js';

const initialState = {
  channelsList: [],
  currentChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (channels, { payload }) => (
      {
        ...channels,
        channelsList: [...channels.channelsList, payload.channel],
      }
      // channels.channelsList.push(payload.channel);
    ),
    changeActiveChannel: (channels, { payload }) => (
      { ...channels, currentChannelId: payload }
      // channels.currentChannelId = payload;
    ),
    removeChannel: (channels, { payload }) => {
      const newChannels = { ...channels };
      const newChannelsList = _.reject(
        channels.channelsList,
        { id: payload.id },
      );

      if (payload.id === channels.currentChannelId) {
        newChannels.currentChannelId = 1;
      }

      newChannels.channelsList = newChannelsList;
      return newChannels;
    },
    renameChannel: (channels, { payload }) => {
      const channel = _.find(
        channels.channelsList,
        { id: payload.id },
      );
      channel.name = payload.name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (channels, { payload }) => (
        {
          ...channels,
          channelsList: payload.channels,
        }
        // channels.channelsList = payload.channels;
      ))
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
