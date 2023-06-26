import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import { Contacts, Home, Login, NotFound, Profile, Register } from 'pages';
import { Loader, SharedLayout } from './';
import { selectIsRefreshing, selectUserToken } from 'redux/auth/selectors';
import { ProtectedRoute } from './Routes/ProtectedRoute';
import { PrivateRoute } from './Routes/PrivateRoute';
import { refreshUser } from 'redux/auth/operations';
import { selectIsLoading } from 'redux/contacts/selectors';

let theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          minHeight: '100%',
        },
        body: {
          backgroundImage:
            'linear-gradient(180deg, #ffffff 0, #f2f4f5 25%, #d1dde3 50%, #b1c6d2 75%, #94b2c2 100%)',
        },
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#e0e0e0;',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#b4afaf',
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

export const App = () => {
  const dispatch = useDispatch();

  const token = useSelector(selectUserToken);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoading = useSelector(selectIsLoading);

  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (token && !mount) {
      dispatch(refreshUser());
      setMount(true);
    }
  }, [dispatch, token, mount]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute defaultRoute="/сontacts">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute defaultRoute="/сontacts">
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/сontacts"
              element={
                <PrivateRoute defaultRoute="/">
                  <Contacts />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute defaultRoute="/">
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>

      {(isLoading && <Loader />) || (isRefreshing && <Loader />)}
    </>
  );
};
