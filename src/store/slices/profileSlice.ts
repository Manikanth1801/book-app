import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/auth';

interface ProfileState {
  user: User | null;
}

const initialState: ProfileState = {
  user: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setProfile, updateProfile } = profileSlice.actions;
export default profileSlice.reducer; 