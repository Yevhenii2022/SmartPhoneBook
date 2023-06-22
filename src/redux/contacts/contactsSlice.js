import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  editContact,
  fetchContacts,
} from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const extraActions = [addContact, deleteContact, editContact, fetchContacts];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload];
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(({ id }) => id !== action.payload);
      })
      .addCase(editContact.fulfilled, (state, action) => {
        const { name, number, id } = action.payload;
        const index = state.items.findIndex(contact => contact.id === id);
        state.items[index] = { id, name, number };
      })
      .addMatcher(
        isAnyOf(...extraActions.map(action => action.pending)),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(...extraActions.map(action => action.rejected)),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          ...extraActions.map(action => action.fulfilled)
          // fetchContacts.fulfilled,
          // addContact.fulfilled,
          // deleteContact.fulfilled
        ),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
