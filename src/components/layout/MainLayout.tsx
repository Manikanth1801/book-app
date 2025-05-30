import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children || <Outlet />}
      </Container>
      <Footer />
    </Box>
  );
};

export default MainLayout; 