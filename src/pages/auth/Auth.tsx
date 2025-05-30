import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Alert,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { login } from '../../store/slices/authSlice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Auth: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Temporary admin bypass
    if (email === 'test@test.com' && password === '123456789') {
      // Dispatch login action with admin role
      dispatch(login({
        user: {
          email: 'test@test.com',
          role: 'admin'
        },
        isAuthenticated: true
      }));
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Add signup logic here
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="h5" gutterBottom>
              Login to Your Account
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Temporary Admin Access:
                <br />
                Email: test@test.com
                <br />
                Password: 123456789
              </Typography>
            </Box>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3 }}
              >
                Login
              </Button>
            </form>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h5" gutterBottom>
              Create an Account
            </Typography>
            <form onSubmit={handleSignup}>
              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                margin="normal"
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3 }}
              >
                Sign Up
              </Button>
            </form>
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
};

export default Auth; 