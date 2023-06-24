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
import { register } from 'redux/auth/operations';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zа-яA-ZА-Яіє'ї ]+$/,
      'The name must consist of only characters'
    )
    .min(3, 'The name must be at least 3 characters')
    .max(30, 'The name must not be longer than 30 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address format')
    .required('Email address is required'),
  password: yup
    .string()
    .min(7, 'The password must be at least 7 characters long')
    .max(20, 'Lots of numbers')
    .required('Password is required'),
  confirm: yup
    .string()
    .required('Confirm password')
    .oneOf([yup.ref('password'), null], 'Entered passwords are different'),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm: '',
    },
    validationSchema: schema,
    onSubmit: (values, { setSubmitting }) => {
      const { name, email, password } = values;
      dispatch(register({ name, email, password }));
      setSubmitting(false);
    },
    validateOnBlur: true,
  });

  return (
    <Paper
      sx={{
        p: 2,
        mb: 8,
        m: 'auto',
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
        Sign Up
      </Typography>
      <Typography sx={{ mb: 2 }}>Type your name, email and password</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          InputLabelProps={{ disableAnimation: true, shrink: true }}
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={(formik.touched.name && formik.errors.name) || ' '}
          variant="outlined"
          sx={{ mb: '20px', width: '100%' }}
        />
        <TextField
          InputLabelProps={{ disableAnimation: true, shrink: true }}
          id="email"
          name="email"
          label="Email"
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
            onChange={evt => {
              formik.handleChange(evt);
            }}
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
        <FormControl sx={{ mb: 2, width: '100%' }} variant="outlined">
          <InputLabel
            error={formik.touched.confirm && Boolean(formik.errors.confirm)}
            disableAnimation
            shrink
            htmlFor="confirm"
          >
            Password confirmation
          </InputLabel>
          <OutlinedInput
            notched
            fullWidth
            id="confirm"
            name="confirm"
            label="Password confirmation"
            type={showConfirm ? 'text' : 'password'}
            value={formik.values.confirm}
            aria-describedby="confirm-helper-text"
            onChange={formik.handleChange}
            error={formik.touched.confirm && Boolean(formik.errors.confirm)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm visibility"
                  onClick={() => setShowConfirm(show => !show)}
                  edge="end"
                >
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.touched.confirm && formik.errors.confirm ? (
            <FormHelperText
              error={formik.touched.confirm && Boolean(formik.errors.confirm)}
              id="confirm-helper-text"
            >
              {formik.errors.confirm}
            </FormHelperText>
          ) : (
            <FormHelperText id="confirm-helper-text"> </FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          variant="outlined"
          sx={{ mb: 1, display: 'block' }}
        >
          Sign Up
        </Button>
      </form>
      <Typography>
        Already have an account?{' '}
        <Button onClick={() => navigate('/login')}>Log In</Button>
      </Typography>
    </Paper>
  );
};
