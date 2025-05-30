import { createSlice } from '@reduxjs/toolkit';
import { Cart, CartItem, Book } from '../../types';

interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.bookId !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { bookId, quantity } = action.payload;
      const item = state.items.find(item => item.bookId === bookId);
      
      if (item) {
        item.quantity = quantity;
        state.total = state.items.reduce((total, item) => 
          total + (item.book.price * item.quantity), 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 