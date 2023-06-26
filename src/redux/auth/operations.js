import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { showSuccessMessage } from '../../utils/notifications';
import { fetchContacts } from 'redux/contacts/operations';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const setAuthHeader = token =>
  (axios.defaults.headers.common.Authorization = `Bearer ${token}`);

const cleanAuthHeader = () =>
  (axios.defaults.headers.common.Authorization = '');

export const register = createAsyncThunk(
  'auth/register',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/signup', user);
      setAuthHeader(data.token);
      showSuccessMessage(`Nice to meet you ${data.user.name}!`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginization = createAsyncThunk(
  'auth/loginization',
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post('/users/login', user);
      setAuthHeader(data.token);
      dispatch(fetchContacts());
      showSuccessMessage(`Nice to see you again, ${data.user.name}!`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/users/logout');
      cleanAuthHeader();
      showSuccessMessage(`See you in our app!`);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const { token } = getState().auth;
    token && setAuthHeader(token);

    try {
      const { data } = await axios.get('/users/current');
      dispatch(fetchContacts());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
