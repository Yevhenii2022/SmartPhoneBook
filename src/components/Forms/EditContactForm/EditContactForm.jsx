import React from 'react';
import { Button, TextField, Modal, IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editContact } from '../../../redux/contacts/operations';
import {
  selectContacts,
  selectIsLoading,
} from '../../../redux/contacts/selectors';
import { StyledPaper } from './EditContactForm.styled';
import { showInfoMessage } from '../../../utils/notifications';
import { formatPhoneNumber } from '../../../utils/phoneFormatter';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'must be at least 3 characters')
    .required('name is required'),
  number: yup
    .string()
    .matches(
      /\([0-9]{3}\)[ .-][0-9]{3}[ .-][0-9]{2}[ .-][0-9]{2}/,
      'Invalid format. Must be (066) 101-30-07'
    )
    .max(15, 'Invalid format. Must be (066) 101-30-07')
    .required('phone number is required'),
});

export const EditContactForm = ({ id }) => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const { name: oldName, number: oldNumber } = contacts.find(
    contact => contact.id === id
  );
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      name: oldName,
      number: oldNumber,
    },
    validationSchema: schema,
    onSubmit: ({ name, number }, { setSubmitting, resetForm }) => {
      const repeatNumber = contacts.find(contact => contact.number === number);

      if (
        number !== oldNumber &&
        contacts.some(contact => contact.number === number)
      ) {
        showInfoMessage(
          `Number "${number}" is already in contacts with name "${repeatNumber.name}"`
        );
        setSubmitting(false);
        return;
      }
      // resetForm();
      dispatch(editContact({ id, name, number }));
      setSubmitting(false);
      setOpen(false);
    },
  });

  return (
    <>
      <IconButton
        color="primary"
        aria-label="edit contact"
        disabled={isLoading}
        data-id={id}
        onClick={handleOpen}
      >
        <BorderColorIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-add-contact-title"
        aria-describedby="modal-add-contact-description"
      >
        <StyledPaper>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 40,
            }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              variant="outlined"
              id="name"
              label="Name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              InputLabelProps={{ shrink: true }}
              placeholder="enter the name of the contact"
              fullWidth
              aria-describedby="contact's name"
            />

            <TextField
              variant="outlined"
              id="number"
              label="Phone number"
              name="number"
              type="tel"
              value={formik.values.number}
              onChange={evt => {
                evt.target.value = formatPhoneNumber(evt.target.value);
                formik.handleChange(evt);
              }}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={formik.touched.number && formik.errors.number}
              InputLabelProps={{ shrink: true }}
              placeholder="enter the contact's phone number"
              fullWidth
              aria-describedby="phone number"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              centerRipple="true"
              sx={{
                width: 200,
              }}
              disabled={isLoading}
            >
              <PersonAddIcon
                sx={{
                  mr: 1.5,
                }}
              />
              EDIT CONTACT
            </Button>
          </form>
        </StyledPaper>
      </Modal>
    </>
  );
};
