import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Rating,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { Book } from '../../types/mockTypes';
import { books as booksData } from '../../data/books';

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(booksData);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    author: '',
    isbn: '',
    price: 0,
    stock: 0,
    category: '',
    description: '',
    format: 'Paperback',
    inStock: true,
  });

  const handleOpen = (book?: Book) => {
    if (book) {
      setSelectedBook(book);
      setFormData(book);
    } else {
      setSelectedBook(null);
      setFormData({
        title: '',
        author: '',
        isbn: '',
        price: 0,
        stock: 0,
        category: '',
        description: '',
        format: 'Paperback',
        inStock: true,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
    setFormData({
      title: '',
      author: '',
      isbn: '',
      price: 0,
      stock: 0,
      category: '',
      description: '',
      format: 'Paperback',
      inStock: true,
    });
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
        id: `BK${String(books.length + 1).padStart(3, '0')}`,
        coverImage: '/images/default-book.jpg',
        rating: 0,
        reviews: [],
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Books Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Book
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {books.map((book) => (
          <Box key={book.id} sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={book.coverImage}
                alt={book.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  by {book.author}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={book.rating || 0} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({book.rating || 0})
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="h6" color="primary">
                    ${book.price.toFixed(2)}
                  </Typography>
                  <Chip
                    label={book.format}
                    size="small"
                    color={book.format === 'eBook' ? 'secondary' : 'primary'}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Stock: {book.stock}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleOpen(book)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(book.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedBook ? 'Edit Book' : 'Add New Book'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              fullWidth
              label="Author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
            <TextField
              fullWidth
              label="ISBN"
              value={formData.isbn}
              onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              />
              <TextField
                fullWidth
                type="number"
                label="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              />
            </Box>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <MenuItem value="Fiction">Fiction</MenuItem>
                <MenuItem value="Science Fiction">Science Fiction</MenuItem>
                <MenuItem value="Romance">Romance</MenuItem>
                <MenuItem value="Fantasy">Fantasy</MenuItem>
                <MenuItem value="Mystery">Mystery</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Format</InputLabel>
              <Select
                value={formData.format}
                label="Format"
                onChange={(e) => setFormData({ ...formData, format: e.target.value as 'eBook' | 'Paperback' })}
              >
                <MenuItem value="Paperback">Paperback</MenuItem>
                <MenuItem value="eBook">eBook</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
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

export default Books; 