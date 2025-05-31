import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address } from '../../types';

interface AddressWithId extends Address {
  id: number;
  label: string;
  phone: string;
  isDefault: boolean;
}

interface AddressState {
  addresses: AddressWithId[];
}

const initialState: AddressState = {
  addresses: [],
};

const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<AddressWithId>) => {
      state.addresses.push(action.payload);
    },
    editAddress: (state, action: PayloadAction<AddressWithId>) => {
      const idx = state.addresses.findIndex(a => a.id === action.payload.id);
      if (idx !== -1) state.addresses[idx] = action.payload;
    },
    deleteAddress: (state, action: PayloadAction<number>) => {
      state.addresses = state.addresses.filter(a => a.id !== action.payload);
    },
    setDefaultAddress: (state, action: PayloadAction<number>) => {
      state.addresses = state.addresses.map(a => ({ ...a, isDefault: a.id === action.payload }));
    },
  },
});

export const { addAddress, editAddress, deleteAddress, setDefaultAddress } = addressSlice.actions;
export default addressSlice.reducer; 