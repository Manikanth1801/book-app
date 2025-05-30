import React from 'react';
import { Box, Typography } from '@mui/material';
import BookCard from '../../components/common/BookCard';
import { mockBooks } from '../../data/mockData';

export default function Books() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>All Books</Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        {mockBooks.map(book => (
          <Box key={book.id}>
            <BookCard book={book} />
          </Box>
        ))}
      </Box>
    </Box>
  );
} 