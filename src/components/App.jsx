import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Contacts, Home, Login, NotFound, Register } from 'pages';
import { SharedLayout } from './';
import { fetchContacts } from 'redux/contacts/operations';

const theme = createTheme({
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

export const App = () => {
  const dispatch = useDispatch();
  // const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  /* {isLoading && <Loader />} */

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/сontacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};
