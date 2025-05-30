import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';

interface StoreSettings {
  storeName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  currency: string;
  taxRate: string;
  enableNotifications: boolean;
  enableEmailNotifications: boolean;
  enableSMSNotifications: boolean;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<StoreSettings>({
    storeName: 'Subhman.Store',
    email: 'contact@bookstore.com',
    phone: '+1 234 567 8900',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    currency: 'USD',
    taxRate: '8.875',
    enableNotifications: true,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (field: keyof StoreSettings) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Here you would typically save the settings to your backend
    console.log('Saving settings:', settings);
    setShowAlert(true);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Store Settings
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'grid', gap: 3 }}>
          <Typography variant="h6">General Information</Typography>
          <TextField
            label="Store Name"
            value={settings.storeName}
            onChange={handleChange('storeName')}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={settings.email}
            onChange={handleChange('email')}
            fullWidth
          />
          <TextField
            label="Phone"
            value={settings.phone}
            onChange={handleChange('phone')}
            fullWidth
          />

          <Typography variant="h6">Address</Typography>
          <TextField
            label="Street Address"
            value={settings.address}
            onChange={handleChange('address')}
            fullWidth
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
            <TextField
              label="City"
              value={settings.city}
              onChange={handleChange('city')}
            />
            <TextField
              label="State"
              value={settings.state}
              onChange={handleChange('state')}
            />
            <TextField
              label="ZIP Code"
              value={settings.zipCode}
              onChange={handleChange('zipCode')}
            />
          </Box>

          <Typography variant="h6">Store Configuration</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Currency"
              value={settings.currency}
              onChange={handleChange('currency')}
            />
            <TextField
              label="Tax Rate (%)"
              type="number"
              value={settings.taxRate}
              onChange={handleChange('taxRate')}
            />
          </Box>

          <Typography variant="h6">Notification Settings</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={settings.enableNotifications}
                onChange={handleChange('enableNotifications')}
              />
            }
            label="Enable Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.enableEmailNotifications}
                onChange={handleChange('enableEmailNotifications')}
                disabled={!settings.enableNotifications}
              />
            }
            label="Email Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.enableSMSNotifications}
                onChange={handleChange('enableSMSNotifications')}
                disabled={!settings.enableNotifications}
              />
            }
            label="SMS Notifications"
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              size="large"
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings; 