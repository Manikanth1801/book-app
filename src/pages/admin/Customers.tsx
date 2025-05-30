import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { Customer, Order } from '../../data/mockData';
import { mockCustomers } from '../../data/mockData';

const Customers: React.FC = () => {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCustomer(null);
  };

  const getOrderStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatAddress = (address: Customer['address']) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Customer Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Total Spent</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.orders.length}</TableCell>
                <TableCell>
                  ${customer.orders.reduce((total, order) => total + order.total, 0).toFixed(2)}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(customer)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Customer Details
        </DialogTitle>
        <DialogContent>
          {selectedCustomer && (
            <Box sx={{ display: 'grid', gap: 3 }}>
              <Box>
                <Typography variant="h6">Personal Information</Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography><strong>Name:</strong> {selectedCustomer.name}</Typography>
                  <Typography><strong>Email:</strong> {selectedCustomer.email}</Typography>
                  <Typography><strong>Phone:</strong> {selectedCustomer.phone}</Typography>
                  <Typography><strong>Address:</strong> {formatAddress(selectedCustomer.address)}</Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6">Order History</Typography>
                <Box sx={{ mt: 2 }}>
                  {selectedCustomer.orders.map((order) => (
                    <Accordion key={order.id}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                          <Typography>
                            Order #{order.id} - {new Date(order.createdAt).toLocaleDateString()}
                          </Typography>
                          <Chip
                            label={order.status}
                            color={getOrderStatusColor(order.status)}
                            size="small"
                          />
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box sx={{ display: 'grid', gap: 2 }}>
                          <Box>
                            <Typography variant="subtitle2">Items:</Typography>
                            {order.items.map((item, index) => (
                              <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                <Typography>
                                  {item.quantity}x Book ID: {item.bookId}
                                </Typography>
                                <Typography>
                                  ${item.salePrice ? item.salePrice : item.price}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                          <Box>
                            <Typography variant="subtitle2">Shipping Address:</Typography>
                            <Typography>{formatAddress(order.shippingAddress)}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="subtitle2">Payment Method:</Typography>
                            <Typography>{order.paymentMethod}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="subtitle2">Total:</Typography>
                            <Typography>${order.total.toFixed(2)}</Typography>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Customers; 