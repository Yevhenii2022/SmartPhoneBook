import React from 'react';
import { useSelector } from 'react-redux';
import {
  List,
  ListItem,
  ListItemAvatar,
  IconButton,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {
  selectFilteredContacts,
  selectIsLoading,
} from 'redux/contacts/selectors';
import { getColorFromName } from '../../utils/getColorFromName';
import { getFirstTwoLetters } from '../../utils/getFirstTwoLetters';
import { DropdownDeleteContact } from '../index';
import {
  StyledPaper,
  StyledAvatar,
  StyledTypography,
  StyledStack,
} from './Contacts.styled';

export const Contacts = ({ theme }) => {
  const isLoading = useSelector(selectIsLoading);
  const filteredContacts = useSelector(selectFilteredContacts);

  if (!filteredContacts?.length && !isLoading) {
    return (
      <Paper
        elevation={10}
        sx={{ mx: 'auto', p: 1, maxWidth: 330 }}
        align="center"
      >
        <Typography variant="subtitle1: 'h4'" sx={{ my: 2 }}>
          No contact was found for your request.
        </Typography>
      </Paper>
    );
  }

  return (
    <List>
      {[...filteredContacts].reverse().map(({ id, name, number }) => (
        <StyledPaper
          elevation={12}
          sx={{ p: 3, my: 1.5, mx: 'auto', maxWidth: '800px' }}
        >
          <ListItem
            key={id}
            secondaryAction={
              <StyledStack direction="row" alignItems="center" spacing={1}>
                <a
                  href={`tel:+38${number.replace(/[^\d]/g, '')}`}
                  aria-label="call"
                >
                  <StyledAvatar sx={{ backgroundColor: '#4caf50', mr: 1 }}>
                    <PhoneInTalkIcon />
                  </StyledAvatar>
                </a>
                <IconButton
                  color="primary"
                  aria-label="edit contact"
                  data-id={id}
                >
                  <BorderColorIcon />
                </IconButton>
                <DropdownDeleteContact id={id} name={name} />
              </StyledStack>
            }
          >
            <ListItemAvatar>
              <StyledAvatar
                sx={{
                  mr: 2,
                  bgcolor: getColorFromName(
                    getFirstTwoLetters(name).toUpperCase()
                  ),
                  height: 50,
                  width: 50,
                }}
              >
                {getFirstTwoLetters(name).toUpperCase()}
              </StyledAvatar>
            </ListItemAvatar>
            <Box>
              <StyledTypography variant="h6">{name}</StyledTypography>
              <StyledTypography>{number}</StyledTypography>
            </Box>
          </ListItem>
        </StyledPaper>
      ))}
    </List>
  );
};
