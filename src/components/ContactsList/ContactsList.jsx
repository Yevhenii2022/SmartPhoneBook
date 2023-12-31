import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Typography } from '@mui/material';
import { selectContacts, selectIsLoading } from 'redux/contacts/selectors';
import { Contacts } from '../Contacts/Contacts';
import { FakeContactsCreate } from 'components';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contacts/operations';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Box
      component="section"
      m="auto"
      sx={{
        mb: 5,
        maxWidth: '900px',
      }}
    >
      <Paper elevation={12} sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ my: 1.5 }} align="center">
          Contacts
        </Typography>

        {contacts.length === 0 && !isLoading ? (
          <Paper
            elevation={10}
            sx={{ mx: 'auto', p: 2, maxWidth: 560 }}
            align="center"
          >
            <Typography variant="subtitle1: 'h4'" sx={{ my: 2 }}>
              There are no saved contacts. Use the button above to add new
              contacts.
            </Typography>
            <FakeContactsCreate />
          </Paper>
        ) : (
          <Contacts />
        )}
      </Paper>
    </Box>
  );
};
