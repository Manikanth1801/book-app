import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Divider } from '@mui/material';

const mockOrder = {
  id: 'ABC1001',
  status: 'Out for Delivery',
  estimatedDelivery: '2024-06-10',
  address: '123 Main St, Springfield, USA',
  items: [
    { title: 'The Great Gatsby', qty: 1 },
    { title: '1984', qty: 2 },
  ],
  history: [
    { date: '2024-06-07', status: 'Shipped' },
    { date: '2024-06-08', status: 'Arrived at Local Facility' },
    { date: '2024-06-09', status: 'Out for Delivery' },
  ],
};

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim().toUpperCase() === 'ABC1001') {
      setOrder(mockOrder);
      setNotFound(false);
    } else {
      setOrder(null);
      setNotFound(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', py: 6 }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 800 }}>
        Track Your Order
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Use order ID as ABC1001 for testing
      </Typography>
      <Paper sx={{ p: 4, mb: 4 }}>
        <form onSubmit={handleTrack}>
          <TextField
            label="Order ID"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Track Order
          </Button>
        </form>
      </Paper>
      {order && (
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Order #{order.id}
          </Typography>
          <Typography>Status: {order.status}</Typography>
          <Typography>Estimated Delivery: {order.estimatedDelivery}</Typography>
          <Typography>Delivery Address: {order.address}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>Items:</Typography>
          {order.items.map((item: any, idx: number) => (
            <Typography key={idx}>
              {item.title} x{item.qty}
            </Typography>
          ))}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>Tracking History:</Typography>
          {order.history.map((h: any, idx: number) => (
            <Typography key={idx}>
              {h.date}: {h.status}
            </Typography>
          ))}
        </Paper>
      )}
      {notFound && (
        <Paper sx={{ p: 4 }}>
          <Typography color="error" variant="h6">Order not found.</Typography>
        </Paper>
      )}
    </Box>
  );
} 