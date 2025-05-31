import React from 'react';
import { Box, Typography } from '@mui/material';
import BookCard from '../../components/common/BookCard';
import { books } from '../../data/books';

export default function Home() {
  // For simplicity, displaying a few books on the home page
  const booksToShow = books.slice(0, 4); // Display first 4 books

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Welcome to the Subhman.Store</Typography>
      <Typography variant="h6" gutterBottom>Featured Books</Typography>
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
        {booksToShow.map((book:any) => (
          <Box key={book.id}>
            <BookCard book={book} />
          </Box>
        ))}
      </Box>
      {/* Add more sections for new arrivals, bestsellers, etc. */}
    </Box>
  );
} 