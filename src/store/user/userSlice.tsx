import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {Axios} from '../../lib/Axios';
import {store} from '../index';
import {ProfilePayload} from './type';

export const GET_PROFILE = '/api/get-profile';

export const getUserProfile = createAsyncThunk(
  GET_PROFILE,
  async (_, {rejectWithValue, fulfillWithValue}) => {
    const {userId} = store.getState().auth;

    const formData = new FormData();
    formData.append('user_id', userId);

    const result = await Axios.post('myprofile', formData, {
      headers: {
        Accept: 'application/json',
        'content-type': 'multipart/form-data',
      },
    });
    if (result.data.status === '1') {
      const userData = {
        firstName: result.data.data.first_name,
        lastName: result.data.data.last_name,
        email: result.data.data.email,
        picture: result.data.data.avatar_url,
        joined: result.data.data.date_created,
      };
      return fulfillWithValue(userData);
    } else {
      return rejectWithValue(new Error(result.data.message));
    }
  },
);
export const updateProfile = createAsyncThunk(
  GET_PROFILE,
  async (
    {firstName, lastName, userImage}: ProfilePayload,
    {rejectWithValue},
  ) => {
    const {userId} = store.getState().auth;

    console.log('userImage', userImage);

    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('display_name', firstName);
    if (userImage?.uri) {
      formData.append('image', {
        uri: userImage?.uri,
        name: userImage?.name,
        type: userImage?.type,
      });
    }

    const result = await Axios.post('profile', formData, {
      headers: {
        Accept: 'application/json',
        'content-type': 'multipart/form-data',
      },
    });
    if (result.data.status === '1') {
      console.log('result.data', result.data);
      return true;
    } else {
      return rejectWithValue(new Error(result.data.message));
    }
  },
);

const initialState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
