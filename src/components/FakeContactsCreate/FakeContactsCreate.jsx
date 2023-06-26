import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import phonebook from '../../data/phonebook.json';

import { addContact } from 'redux/contacts/operations';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 2,
};

export const FakeContactsCreate = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const createFakeContacts = () => {
    setOpen(false);
    phonebook.forEach(contact => dispatch(addContact(contact)));
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ContactSupportIcon />}
        aria-label="create contact"
        onClick={handleOpen}
        sx={{ mt: 2 }}
      >
        CREATE FAKE CONTACTS
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>
            Automatically generated contacts will be added to your contacts, are
            you sure?
          </Typography>
          <Button sx={{ mt: 2 }} onClick={createFakeContacts}>
            Yes
          </Button>
        </Box>
      </Modal>
    </>
  );
};
