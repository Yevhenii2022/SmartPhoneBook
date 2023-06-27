import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginization } from 'redux/auth/operations';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address format')
    .required('Email address is required'),
  password: yup
    .string()
    .min(7, 'The password must be at least 7 characters long')
    .max(20, 'Lots of numbers')
    .required('Password is required'),
});

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(loginization(values));
      setSubmitting(false);
    },
    validateOnBlur: true,
  });

  return (
    <Paper
      elevation={10}
      sx={{
        p: 2,
        mt: 2,
        mx: 'auto',
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.9)',
        maxWidth: 450,
      }}
    >
      <Typography
        variant="h4"
        sx={theme => ({
          mb: 1,
          fontWeight: 500,
          color: theme.palette.primary.main,
          textShadow: '2px 2px 3px rgba(0,0,100,0.3)',
        })}
      >
        Log In
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Fill your email and password to log in
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          InputLabelProps={{ disableAnimation: true, shrink: true }}
          id="email"
          name="email"
          label="Еmail"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={(formik.touched.email && formik.errors.email) || ' '}
          variant="outlined"
          sx={{ mb: '20px', width: '100%' }}
        />
        <FormControl sx={{ mb: 2, width: '100%' }} variant="outlined">
          <InputLabel
            error={formik.touched.password && Boolean(formik.errors.password)}
            disableAnimation
            shrink
            htmlFor="password"
          >
            Password
          </InputLabel>
          <OutlinedInput
            notched
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            aria-describedby="password-helper-text"
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(show => !show)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.touched.password && formik.errors.password ? (
            <FormHelperText
              error={formik.touched.password && Boolean(formik.errors.password)}
              id="password-helper-text"
            >
              {formik.errors.password}
            </FormHelperText>
          ) : (
            <FormHelperText id="password-helper-text"> </FormHelperText>
          )}
        </FormControl>
        <Button
          variant="outlined"
          type="submit"
          sx={{ mb: 1, display: 'block' }}
        >
          Log in
        </Button>
      </form>
      <Typography>
        Don't have account yet?{' '}
        <Button onClick={() => navigate('/register')}>Sign up</Button>
      </Typography>
    </Paper>
  );
};
