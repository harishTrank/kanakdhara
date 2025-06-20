import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Axios} from '../../lib/Axios';
import {AuthSliceState, LoginPayload, RegisterPayload} from './types';
import {USER_SESSION} from '../../lib/Constants';

export const AUTH_LOGOUT = '/api/auth/logout';
export const AUTH_RESTORE = '/api/auth/restore';
export const LOGIN = '/auth/login';
export const REGISTER = '/auth/register';

export const createSession = async (userData: {userId: number | null}) => {
  const payload = JSON.stringify(userData);
  await AsyncStorage.setItem(USER_SESSION, payload);
  await AsyncStorage.setItem('accessToken', payload);
  await AsyncStorage.setItem('wishList', JSON.stringify([]));
};

export const restoreSession = createAsyncThunk(AUTH_RESTORE, async () => {
  const result = await AsyncStorage.getItem(USER_SESSION);

  if (result) {
    return JSON.parse(result);
  }
});

export const logout = createAsyncThunk(AUTH_LOGOUT, async _ => {
  await AsyncStorage.removeItem(USER_SESSION);
  await AsyncStorage.removeItem('accessToken');
  return true;
});

export const login = createAsyncThunk(
  LOGIN,
  async (
    {phone, password}: LoginPayload,
    {rejectWithValue, fulfillWithValue},
  ) => {
    const result = await Axios.post('login', {
      phone: phone,
      password: password,
    });
    if (result.data.code === '1') {
      const userData = {
        userId: result.data.details.id,
      };
      await createSession(userData);
      return fulfillWithValue(userData);
    } else {
      return rejectWithValue(new Error(result.data.message));
    }
  },
);

export const register = createAsyncThunk(
  REGISTER,
  async (
    {
      firstName,
      lastName,
      email,
      mobile,
      password,
      confirmPass,
    }: RegisterPayload,
    {rejectWithValue, fulfillWithValue},
  ) => {
    const formData = new FormData();
    formData.append('fname', firstName);
    formData.append('lname', lastName);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('password', password);
    formData.append('confirmpass', confirmPass);

    const result = await Axios.post('register', formData, {
      headers: {
        Accept: 'application/json',
        'content-type': 'multipart/form-data',
      },
    });

    if (result.data.status === '1') {
      const userData = {
        userId: result.data.details.id,
      };
      await createSession(userData);
      return fulfillWithValue(userData);
    } else {
      return rejectWithValue(new Error(result.data.message));
    }
  },
);

const initialState: AuthSliceState = {
  isLoading: false,
  userId: null,
};

export const authSlice: any = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
    });

    // restore session
    builder.addCase(restoreSession.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(restoreSession.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.userId = action.payload.userId;
      }
    });
    builder.addCase(restoreSession.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
