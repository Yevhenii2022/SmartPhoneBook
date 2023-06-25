import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/auth/selectors';

export const Home = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  return (
    <Paper
      elevation={10}
      sx={{ mt: 26, mx: 'auto', p: 3, maxWidth: 530 }}
      align="center"
    >
      <Typography variant="h5" sx={{ mb: 1 }} align="center" color="#78909c">
        Welcome to our app for saving contacts
      </Typography>
      <Typography variant="h4" sx={{ mb: 4 }} align="center" color="#546e7a">
        SmartPhone Book
      </Typography>
      <Box display="flex" justifyContent="center">
        {isLoggedIn ? (
          <Button variant="contained" onClick={() => navigate('/сontacts')}>
            Go to contacts
          </Button>
        ) : (
          <>
            <Button variant="contained" onClick={() => navigate('/login')}>
              Log in
            </Button>
            <Divider
              variant="middle"
              orientation="vertical"
              flexItem
              sx={{ mx: 3 }}
            />
            <Button variant="outlined" onClick={() => navigate('/register')}>
              Sign Up
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
};
