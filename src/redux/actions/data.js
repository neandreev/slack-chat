import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const getDataRequest = createAction('GET_DATA_REQUEST');
const getDataSuccess = createAction('GET_DATA_SUCCESS');
const getDataFailure = createAction('GET_DATA_FAILURE');

export const getData = () => async (dispatch) => {
  dispatch(getDataRequest());
  try {
    const { data } = await axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    dispatch(getDataSuccess({ data }));
  } catch (error) {
    dispatch(getDataFailure({ error }));
  }
};

export const changeActiveChannel = (id) => createAction('CHANNEL_CHANGE')({ id });

// export const newMessage = (message) => (dispatch) => (
//   dispatch({ type: 'NEW_MESSAGE', payload: { message }})
// );

export const newMessage = (message) => createAction('NEW_MESSAGE')(message);

export const addChannel = (channel) => createAction('ADD_CHANNEL')({ channel });

export const removeChannel = (id) => createAction('REMOVE_CHANNEL')({ id });

export const renameChannel = (id, name) => createAction('RENAME_CHANNEL')({ id, name });

export default getData;
