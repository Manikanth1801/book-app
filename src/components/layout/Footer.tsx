import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 6, md: 8 },
        px: 2,
        mt: 'auto',
        backgroundColor: '#FFF',
        color: '#000',
        borderTop: `4px solid ${theme.palette.secondary.main}`,
        boxShadow: '0 -2px 12px rgba(0,0,0,0.04)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 6 }}>
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 800, color: '#000' }}>
              Subhman.Store
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ color: '#666' }}>
              Your one-stop destination for all your reading needs.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#000' }}>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/books" color="inherit" display="block" underline="hover" sx={{ color: '#000', mb: 1 }}>
              Books
            </Link>
            <Link component={RouterLink} to="/about" color="inherit" display="block" underline="hover" sx={{ color: '#000', mb: 1 }}>
              About Us
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" display="block" underline="hover" sx={{ color: '#000' }}>
              Contact
            </Link>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#000' }}>
              Connect With Us
            </Typography>
            <Box>
              <IconButton sx={{ color: '#000', mr: 1 }} aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: '#000', mr: 1 }} aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: '#000', mr: 1 }} aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: '#000' }} aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box mt={6}>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ color: '#666' }}>
            {'© '}
            {new Date().getFullYear()}
            {' Subhman.Store from Dev-evelopers. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 