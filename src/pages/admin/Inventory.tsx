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
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { Book } from '../../types/mockTypes';
import { books as booksData } from '../../data/books';
const Inventory: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(booksData);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<Book>({
    id: '',
    title: '',
    author: '',
    isbn: '',
    price: 0,
    stock: 0,
    category: '',
    format: 'Paperback',
    inStock: true,
    coverImage: undefined,
    description: undefined,
    rating: undefined,
    reviews: undefined,
    salePrice: undefined,
    publishedDate: '',
  });

  const handleOpen = (book?: Book) => {
    setSelectedBook(book || null);
    setFormData(book || {
      id: '',
      title: '',
      author: '',
      isbn: '',
      price: 0,
      stock: 0,
      category: '',
      format: 'Paperback',
      inStock: true,
      coverImage: undefined,
      description: undefined,
      rating: undefined,
      reviews: undefined,
      salePrice: undefined,
      publishedDate: '',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
    setFormData({
      id: '',
      title: '',
      author: '',
      isbn: '',
      price: 0,
      stock: 0,
      category: '',
      format: 'Paperback',
      inStock: true,
      coverImage: undefined,
      description: undefined,
      rating: undefined,
      reviews: undefined,
      salePrice: undefined,
      publishedDate: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedValue = (name === 'price' || name === 'stock') ? Number(value) : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSelectChange = (e: SelectChangeEvent<'eBook' | 'Paperback'>) => {
    const { name, value } = e.target;
    if (name === 'format') {
      setFormData({ ...formData, [name]: value as 'eBook' | 'Paperback' });
    }
  };

  const handleSubmit = () => {
    if (selectedBook) {
      setBooks(books.map((book) => (book.id === selectedBook.id ? formData : book)));
    } else {
      const newBook = { ...formData, id: `BK${String(books.length + 1).padStart(3, '0')}` };
      setBooks([...books, newBook]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
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
              <TableCell>Format</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.format}</TableCell>
                <TableCell>${book.price.toFixed(2)}</TableCell>
                <TableCell>{book.stock}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(book)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(book.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedBook ? 'Edit Book' : 'Add New Book'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="ISBN"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="format-label">Format</InputLabel>
              <Select
                labelId="format-label"
                id="format-select"
                name="format"
                value={formData.format}
                label="Format"
                onChange={handleSelectChange}
              >
                <MenuItem value="eBook">eBook</MenuItem>
                <MenuItem value="Paperback">Paperback</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {selectedBook ? 'Save Changes' : 'Add Book'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Inventory; 