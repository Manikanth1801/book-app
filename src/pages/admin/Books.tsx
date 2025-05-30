import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

// Mock data for books
const books = [
  {
    id: 'BK001',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 19.99,
    stock: 15,
    category: 'Fiction',
  },
  {
    id: 'BK002',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 15.99,
    stock: 8,
    category: 'Fiction',
  },
  {
    id: 'BK003',
    title: '1984',
    author: 'George Orwell',
    price: 12.99,
    stock: 20,
    category: 'Science Fiction',
  },
  {
    id: 'BK004',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 14.99,
    stock: 12,
    category: 'Romance',
  },
];

const Books: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Books</Typography>
        <Button variant="contained" color="primary">
          Add New Book
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell align="right">${book.price}</TableCell>
                <TableCell align="right">{book.stock}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Books; 