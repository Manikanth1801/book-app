import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '../../types';

interface ReviewsState {
  [bookId: string]: Review[];
}

const initialState: ReviewsState = {};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<{ bookId: string; review: Review }>) => {
      const { bookId, review } = action.payload;
      if (!state[bookId]) state[bookId] = [];
      state[bookId].push(review);
    },
  },
});

export const { addReview } = reviewSlice.actions;
export default reviewSlice.reducer; 