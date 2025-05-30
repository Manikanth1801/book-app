import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { Book } from '../../data/mockData';
import { mockBooks } from '../../data/mockData';

const Inventory: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<Partial<Book>>({});

  const handleOpen = (book?: Book) => {
    if (book) {
      setSelectedBook(book);
      setFormData(book);
    } else {
      setSelectedBook(null);
      setFormData({});
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
    setFormData({});
  };

  const handleSubmit = () => {
    if (selectedBook) {
      // Update existing book
      setBooks(books.map(book => 
        book.id === selectedBook.id ? { ...book, ...formData } : book
      ));
    } else {
      // Add new book
      const newBook: Book = {
        ...formData as Book,
        id: Date.now().toString(),
        reviews: [],
        inStock: true,
      };
      setBooks([...books, newBook]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Inventory Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Book
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>${book.price.toFixed(2)}</TableCell>
                <TableCell>{book.stock}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(book)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(book.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedBook ? 'Edit Book' : 'Add New Book'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 1 }}>
            <Box>
              <TextField
                fullWidth
                label="Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Author"
                value={formData.author || ''}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="ISBN"
                value={formData.isbn || ''}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Stock"
                type="number"
                value={formData.stock || ''}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                select
                label="Category"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <MenuItem value="Fiction">Fiction</MenuItem>
                <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="History">History</MenuItem>
                <MenuItem value="Biography">Biography</MenuItem>
              </TextField>
            </Box>
            <Box sx={{ gridColumn: '1 / -1' }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedBook ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Inventory; 