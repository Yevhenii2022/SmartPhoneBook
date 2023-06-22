import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../utils/notifications';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const fetchContacts = createAsyncThunk(
  'contacts/featchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/contacts');
      return data;
    } catch (error) {
      showErrorMessage(error.message || 'Something went wrong...');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const { data } = await axios.post('/contacts', contact);
      showSuccessMessage(
        <span>
          New contact <b>"{contact.name}"</b> has been added in your phone book
        </span>
      );
      return data;
    } catch (error) {
      showErrorMessage(error.message || 'Something went wrong...');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (contact, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/contacts/${contact.id}`, {
        name: contact.name,
        number: contact.number,
      });
      showSuccessMessage(
        <span>
          You have changed the contact under the name <b>"{contact.name}"</b>
        </span>
      );
      return data;
    } catch (error) {
      showErrorMessage(error.message || 'Something went wrong...');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/contacts/${id}`);
      showErrorMessage(
        <span>
          You have deleted a contact <b>"{data.name}"</b>
        </span>
      );
      return data.id;
    } catch (error) {
      showErrorMessage(error.message || 'Something went wrong...');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
