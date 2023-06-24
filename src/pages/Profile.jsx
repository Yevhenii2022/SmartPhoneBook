import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';
import { getColorFromName } from 'utils/getColorFromName';
import { getFirstTwoLetters } from 'utils/getFirstTwoLetters';

export const Profile = () => {
  const { name, email } = useSelector(selectUser);
  return (
    <Card elevation={10} sx={{ m: { sm: 8, xs: 1.5 } }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          sx={{
            display: {
              xs: 'none',
              sm: 'flex',
            },
            mr: 2,
            bgcolor: getColorFromName(getFirstTwoLetters(name).toUpperCase()),
            height: 60,
            width: 60,
          }}
        >
          {getFirstTwoLetters(name).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h6" color="#424242">
            Name:{' '}
            <Typography variant="h6" color="primary">
              {name}
            </Typography>
          </Typography>
          <Typography variant="h6" color="#424242">
            Email:{' '}
            <Typography variant="h6" color="primary">
              {email}
            </Typography>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
