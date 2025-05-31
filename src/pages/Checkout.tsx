import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  Container,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  Payment as PayPalIcon,
} from '@mui/icons-material';
import { RootState } from '../store';
import { clearCart } from '../store/slices/cartSlice';

const steps = ['Shipping Address', 'Payment Method', 'Order Summary', 'Confirmation'];

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentMethod {
  type: 'credit' | 'debit' | 'paypal';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  nameOnCard?: string;
}

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState('');

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const subtotal = items.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleNext = () => {
    if (activeStep === steps.length - 2) {
      // Place order
      const newOrderNumber = `ORD-${Date.now()}`;
      setOrderNumber(newOrderNumber);
      dispatch(clearCart());
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return shippingAddress.firstName && shippingAddress.lastName && 
               shippingAddress.address && shippingAddress.city && 
               shippingAddress.state && shippingAddress.zipCode;
      case 1:
        if (paymentMethod.type === 'paypal') return true;
        return paymentMethod.cardNumber && paymentMethod.expiryDate && 
               paymentMethod.cvv && paymentMethod.nameOnCard;
      case 2:
        return true;
      default:
        return false;
    }
  };

  if (items.length === 0 && activeStep < steps.length - 1) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Your cart is empty. Please add items before checkout.
        </Alert>
        <Button variant="contained" color="secondary" onClick={() => navigate('/books')}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
              <TextField
                required
                fullWidth
                label="First Name"
                value={shippingAddress.firstName}
                onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
              />
              <TextField
                required
                fullWidth
                label="Last Name"
                value={shippingAddress.lastName}
                onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
              />
            </Box>
            <TextField
              required
              fullWidth
              label="Address"
              value={shippingAddress.address}
              onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr' }, gap: 2 }}>
              <TextField
                required
                fullWidth
                label="City"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
              />
              <TextField
                required
                fullWidth
                label="State"
                value={shippingAddress.state}
                onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
              />
              <TextField
                required
                fullWidth
                label="ZIP Code"
                value={shippingAddress.zipCode}
                onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
              />
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={paymentMethod.type}
                onChange={(e) => setPaymentMethod({...paymentMethod, type: e.target.value as 'credit' | 'debit' | 'paypal'})}
              >
                <FormControlLabel value="credit" control={<Radio />} label="Credit Card" />
                <FormControlLabel value="debit" control={<Radio />} label="Debit Card" />
                <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
              </RadioGroup>
            </FormControl>
            
            {paymentMethod.type !== 'paypal' && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="Name on Card"
                  value={paymentMethod.nameOnCard}
                  onChange={(e) => setPaymentMethod({...paymentMethod, nameOnCard: e.target.value})}
                  sx={{ mb: 2 }}
                />
                <TextField
                  required
                  fullWidth
                  label="Card Number"
                  value={paymentMethod.cardNumber}
                  onChange={(e) => setPaymentMethod({...paymentMethod, cardNumber: e.target.value})}
                  placeholder="1234 5678 9012 3456"
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <TextField
                    required
                    fullWidth
                    label="Expiry Date"
                    value={paymentMethod.expiryDate}
                    onChange={(e) => setPaymentMethod({...paymentMethod, expiryDate: e.target.value})}
                    placeholder="MM/YY"
                  />
                  <TextField
                    required
                    fullWidth
                    label="CVV"
                    value={paymentMethod.cvv}
                    onChange={(e) => setPaymentMethod({...paymentMethod, cvv: e.target.value})}
                    placeholder="123"
                  />
                </Box>
              </Box>
            )}
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Shipping Address
                </Typography>
                <Typography variant="body2">
                  {shippingAddress.firstName} {shippingAddress.lastName}<br />
                  {shippingAddress.address}<br />
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                </Typography>
              </CardContent>
            </Card>
            
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Payment Method
                </Typography>
                <Typography variant="body2">
                  {paymentMethod.type === 'paypal' ? 'PayPal' : 
                   `${paymentMethod.type === 'credit' ? 'Credit' : 'Debit'} Card ending in ${paymentMethod.cardNumber?.slice(-4)}`}
                </Typography>
              </CardContent>
            </Card>
            
            <List>
              {items.map((item) => (
                <ListItem key={item.bookId}>
                  <ListItemAvatar>
                    <Avatar src={item.book.coverImage} variant="square" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.book.title}
                    secondary={`Quantity: ${item.quantity} × $${item.book.price.toFixed(2)}`}
                  />
                  <Typography variant="body2">
                    ${(item.book.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
            </List>
            
            <Divider />
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Shipping:</Typography>
                <Typography>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Tax:</Typography>
                <Typography>${tax.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">${total.toFixed(2)}</Typography>
              </Box>
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main" gutterBottom>
              Order Confirmed!
            </Typography>
            <Typography variant="h6" gutterBottom>
              Order Number: {orderNumber}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Thank you for your purchase! You will receive a confirmation email shortly.
            </Typography>
            <Button variant="contained" color="secondary" onClick={() => navigate('/account')}>
              View Order History
            </Button>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 800 }}>
        Checkout
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {renderStepContent(activeStep)}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          
          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              {activeStep === steps.length - 2 ? 'Place Order' : 'Next'}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout; 