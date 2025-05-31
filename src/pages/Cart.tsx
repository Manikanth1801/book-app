import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Divider,
  Container,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCartCheckout as CheckoutIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { updateQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);
  
  const subtotal = items.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleUpdateQuantity = (bookId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(bookId));
    } else {
      dispatch(updateQuantity({ bookId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (bookId: string) => {
    dispatch(removeFromCart(bookId));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
          Your Cart is Empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Looks like you haven't added any books to your cart yet.
        </Typography>
        <Button
          component={RouterLink}
          to="/books"
          variant="contained"
          color="secondary"
          size="large"
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 800 }}>
        Shopping Cart
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
        {/* Cart Items */}
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Cart Items ({items.length})
            </Typography>
            <Button
              onClick={() => dispatch(clearCart())}
              color="error"
              variant="outlined"
              size="small"
            >
              Clear Cart
            </Button>
          </Box>
          
          {items.map((item) => (
            <Card key={item.bookId} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <CardMedia
                component="img"
                sx={{ width: 120, height: 160 }}
                image={item.book.coverImage}
                alt={item.book.title}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2 }}>
                <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {item.book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    by {item.book.author}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                    ${item.book.price.toFixed(2)}
                  </Typography>
                </CardContent>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      onClick={() => handleUpdateQuantity(item.bookId, item.quantity - 1)}
                      size="small"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.bookId, parseInt(e.target.value) || 0)}
                      size="small"
                      sx={{ width: 60 }}
                      inputProps={{ min: 1, type: 'number' }}
                    />
                    <IconButton
                      onClick={() => handleUpdateQuantity(item.bookId, item.quantity + 1)}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </Typography>
                    <IconButton
                      onClick={() => handleRemoveItem(item.bookId)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Card>
          ))}
        </Paper>
        
        {/* Order Summary */}
        <Paper sx={{ p: 3, height: 'fit-content' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            Order Summary
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Subtotal ({items.length} items)</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Shipping</Typography>
              <Typography color={shipping === 0 ? 'success.main' : 'text.primary'}>
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Tax</Typography>
              <Typography>${tax.toFixed(2)}</Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Total
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              ${total.toFixed(2)}
            </Typography>
          </Box>
          
          {subtotal < 50 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add ${(50 - subtotal).toFixed(2)} more for free shipping!
            </Typography>
          )}
          
          <Button
            onClick={handleCheckout}
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            startIcon={<CheckoutIcon />}
            sx={{ mb: 2 }}
          >
            Proceed to Checkout
          </Button>
          
          <Button
            component={RouterLink}
            to="/books"
            variant="outlined"
            color="primary"
            fullWidth
          >
            Continue Shopping
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Cart; 