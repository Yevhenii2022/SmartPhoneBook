import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { MyAppBar } from './';

export const SharedLayout = ({ handleMode }) => {
  return (
    <Container maxWidth="lg">
      <MyAppBar handleMode={handleMode}></MyAppBar>
      <Outlet />
      <CssBaseline />
      <ToastContainer />
    </Container>
  );
};
