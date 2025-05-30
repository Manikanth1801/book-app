import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  isDarkMode: boolean;
  primaryColor: string;
  secondaryColor: string;
}

const initialState: ThemeState = {
  isDarkMode: false,
  primaryColor: '#1976d2', // Material-UI default primary
  secondaryColor: '#dc004e', // Material-UI default secondary
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload;
    },
    setSecondaryColor: (state, action: PayloadAction<string>) => {
      state.secondaryColor = action.payload;
    },
  },
});

export const { toggleDarkMode, setPrimaryColor, setSecondaryColor } = themeSlice.actions;
export default themeSlice.reducer; 