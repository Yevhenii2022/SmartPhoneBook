import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { Loader, MyAppBar } from './';

export const SharedLayout = () => {
  return (
    <Container maxWidth="lg">
      <MyAppBar></MyAppBar>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <CssBaseline />
      <ToastContainer />
    </Container>
  );
};
