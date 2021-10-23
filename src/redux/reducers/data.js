import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loaded: false,
  channels: [],
  messages: [],
  currentChannelId: 0,
};

export default createSlice({
  name: 'data',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase('GET_DATA_REQUEST', (state) => (state))
      .addCase('GET_DATA_SUCCESS', (state, action) => (
        { ...state, ...action.payload.data, loaded: true }
      ))
      .addCase('GET_DATA_FAILURE', (state, action) => {
        const { error } = action.payload;
        console.dir(error);
        return { ...state, unauthorized: true };
      })
      .addCase('CHANNEL_CHANGE', (state, action) => (
        { ...state, currentChannelId: action.payload.id }
      ))
      .addCase('NEW_MESSAGE', (state, action) => (
        { ...state, messages: [...state.messages, action.payload.message] }
      ))
      .addCase('ADD_CHANNEL', (state, action) => (
        { ...state, channels: [...state.channels, action.payload.channel]}
      )).
      addCase('REMOVE_CHANNEL', (state, action) => {
        console.log(action);
        const newState = {
          ...state,
          channels: state.channels.filter((channel) => channel.id !== action.payload.id),
          messages: state.messages.filter((message) => message.channelId !== action.payload.id),
        };
        return newState;
      })
      .addCase('RENAME_CHANNEL', (state, action) => (
        { ...state, channels: state.channels.map((channel) => (
          channel.id === action.payload.id
            ? { ...channel, name: action.payload.name }
            : channel
        )) }
      ));
  },
})
