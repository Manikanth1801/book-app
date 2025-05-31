import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Typography, Paper, Divider, Chip, Button, List, ListItem, ListItemText, ListSubheader, TextField, Tabs, Tab, IconButton, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Navigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const initialUser = {
  name: 'John Doe',
  email: 'user@user.com',
  number: '+1 555-123-4567',
};
const initialAddresses = [
  { id: 1, label: 'Home', address: '123 Main St, Springfield, USA', phone: '+1 555-123-4567', isDefault: true },
  { id: 2, label: 'Work', address: '456 Office Rd, Springfield, USA', phone: '+1 555-987-6543', isDefault: false },
];
const initialOrders = [
  {
    id: 'ORD-001',
    date: '2024-06-01',
    total: 49.99,
    status: 'Delivered',
    items: [
      { title: 'The Great Gatsby', qty: 1, price: 15.99 },
      { title: '1984', qty: 2, price: 17.00 },
    ],
  },
  {
    id: 'ORD-002',
    date: '2024-05-15',
    total: 19.99,
    status: 'Shipped',
    items: [
      { title: 'The Hobbit', qty: 1, price: 19.99 },
    ],
  },
];

export default function Account() {
  const userRedux = useSelector((state: any) => state.auth.user);
  const [tab, setTab] = useState(0);
  const [user, setUser] = useState(initialUser);
  const [addresses, setAddresses] = useState(initialAddresses);
  const [orders] = useState(initialOrders);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [editAddressOpen, setEditAddressOpen] = useState(false);
  const [addressForm, setAddressForm] = useState<{ id: number | null; label: string; address: string; phone: string; isDefault: boolean }>({ id: null, label: '', address: '', phone: '', isDefault: false });
  const [userForm, setUserForm] = useState(user);

  if (!userRedux || userRedux.role !== 'user') return <Navigate to="/auth" replace />;

  // User Info Edit
  const handleUserEdit = () => { setUserForm(user); setEditUserOpen(true); };
  const handleUserSave = () => { setUser(userForm); setEditUserOpen(false); };

  // Address Edit/Add
  const handleAddressEdit = (addr: any) => { setAddressForm(addr); setEditAddressOpen(true); };
  const handleAddressAdd = () => { setAddressForm({ id: null, label: '', address: '', phone: '', isDefault: false }); setEditAddressOpen(true); };
  const handleAddressSave = () => {
    if (addressForm.id !== null) {
      setAddresses(addresses.map(a => a.id === addressForm.id ? { ...addressForm, id: addressForm.id as number } : a));
    } else {
      const newId = Math.max(...addresses.map(a => a.id), 0) + 1;
      setAddresses([...addresses, { ...addressForm, id: newId }]);
    }
    setEditAddressOpen(false);
  };
  const handleAddressDelete = (id: number) => setAddresses(addresses.filter(a => a.id !== id));
  const handleSetDefault = (id: number) => setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', py: 6 }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 800 }}>
        My Account
      </Typography>
      <Paper sx={{ mb: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
          <Tab label="Orders" />
          <Tab label="Addresses" />
          <Tab label="User Information" />
        </Tabs>
      </Paper>
      {/* Orders Tab */}
      {tab === 0 && (
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Order History</Typography>
          <List subheader={<ListSubheader>Orders</ListSubheader>}>
            {orders.map(order => (
              <Box key={order.id} sx={{ mb: 3 }}>
                <ListItem>
                  <ListItemText
                    primary={`Order #${order.id} - ${order.status}`}
                    secondary={`Date: ${order.date} | Total: $${order.total}`}
                  />
                </ListItem>
                <List disablePadding>
                  {order.items.map((item, idx) => (
                    <ListItem key={idx} sx={{ pl: 4 }}>
                      <ListItemText
                        primary={`${item.title} x${item.qty}`}
                        secondary={`$${item.price.toFixed(2)} each`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))}
          </List>
        </Paper>
      )}
      {/* Addresses Tab */}
      {tab === 1 && (
        <Paper sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Addresses</Typography>
            <Button startIcon={<AddIcon />} onClick={handleAddressAdd} variant="contained" color="secondary">Add Address</Button>
          </Box>
          <List>
            {addresses.map(addr => (
              <ListItem key={addr.id} secondaryAction={
                <Box>
                  {!addr.isDefault && (
                    <Button size="small" onClick={() => handleSetDefault(addr.id)} sx={{ mr: 1 }}>Set Default</Button>
                  )}
                  <IconButton onClick={() => handleAddressEdit(addr)} sx={{ mr: 1 }}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleAddressDelete(addr.id)} color="error"><DeleteIcon /></IconButton>
                </Box>
              }>
                <ListItemText
                  primary={addr.address}
                  secondary={<>
                    {addr.label} | {addr.phone} {addr.isDefault && <Chip label="Default" color="secondary" size="small" sx={{ ml: 1 }} />}
                  </>}
                />
              </ListItem>
            ))}
          </List>
          {/* Address Edit/Add Dialog */}
          <Dialog open={editAddressOpen} onClose={() => setEditAddressOpen(false)}>
            <DialogTitle>{addressForm.id ? 'Edit Address' : 'Add Address'}</DialogTitle>
            <DialogContent>
              <TextField
                label="Label"
                value={addressForm.label}
                onChange={e => setAddressForm({ ...addressForm, label: e.target.value })}
                fullWidth sx={{ mb: 2 }}
              />
              <TextField
                label="Address"
                value={addressForm.address}
                onChange={e => setAddressForm({ ...addressForm, address: e.target.value })}
                fullWidth sx={{ mb: 2 }}
              />
              <TextField
                label="Phone"
                value={addressForm.phone}
                onChange={e => setAddressForm({ ...addressForm, phone: e.target.value })}
                fullWidth sx={{ mb: 2 }}
              />
              <Box sx={{ mt: 1 }}>
                <Button
                  variant={addressForm.isDefault ? 'contained' : 'outlined'}
                  color="secondary"
                  onClick={() => setAddressForm({ ...addressForm, isDefault: !addressForm.isDefault })}
                >
                  {addressForm.isDefault ? 'Default Address' : 'Mark as Default'}
                </Button>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditAddressOpen(false)}>Cancel</Button>
              <Button onClick={handleAddressSave} variant="contained">Save</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      )}
      {/* User Info Tab */}
      {tab === 2 && (
        <Paper sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>User Information</Typography>
            <Button startIcon={<EditIcon />} onClick={handleUserEdit} variant="contained" color="secondary">Edit</Button>
          </Box>
          <Typography>Name: {user.name}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Phone: {user.number}</Typography>
          {/* User Edit Dialog */}
          <Dialog open={editUserOpen} onClose={() => setEditUserOpen(false)}>
            <DialogTitle>Edit User Information</DialogTitle>
            <DialogContent>
              <TextField
                label="Name"
                value={userForm.name}
                onChange={e => setUserForm({ ...userForm, name: e.target.value })}
                fullWidth sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                value={userForm.email}
                onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                fullWidth sx={{ mb: 2 }}
              />
              <TextField
                label="Phone"
                value={userForm.number}
                onChange={e => setUserForm({ ...userForm, number: e.target.value })}
                fullWidth sx={{ mb: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditUserOpen(false)}>Cancel</Button>
              <Button onClick={handleUserSave} variant="contained">Save</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      )}
    </Box>
  );
} 